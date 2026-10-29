import Action from "../components/action.js";

export default class InscriptionsView {
  constructor(storage) {
    this.storage = storage;
    this.element = document.createElement("section");
    this.element.className = "inscriptions-view";

    // Afficher les détails d'un dossier.
    this.element.addEventListener("click", (event) => {
      const button = event.target.closest(".action");
      if (!button) return;

      const parent = this.storage.getAll().find(
        (item) => item.dossier === button.dataset.dossier
      );

      if (!parent) return;

      const children = Array.isArray(parent.childs)
        ? parent.childs
        : [];


const ancienMenu = button.parentElement.querySelector(".action-menu");

if (ancienMenu) {
    ancienMenu.remove();
    return;
}

const action = new Action();

button.after(action.render());
// prompt(
//         `Dossier : ${parent.dossier}\n` +
//         `Parent : ${parent.parent}\n` +
//         `Téléphone : ${parent.telephone || "—"}\n` +
//         `Email : ${parent.email || "—"}\n` +
//         `Nombre d'enfants : ${children.length}\n` +
//         `Centre : ${parent.center || "—"}`
//             );
    });
  }

  // Construire le HTML de la page.
  render() {
    this.element.innerHTML = `
      <h1>Gestion des inscriptions</h1>

      <div class="input">
        <label for="searchInput">
          Rechercher un dossier, un parent ou un enfant :
        </label>

        <input
          type="search"
          id="searchInput"
          placeholder="Nom du parent, enfant, dossier..."
          autocomplete="off"
        >
      </div>

      <p id="resultsCount" aria-live="polite"></p>

      <div class="table-container">
        <table>
          <caption class="sr-only">
            Liste des dossiers des parents et de leurs enfants
          </caption>

          <thead>
            <tr>
              <th rowspan="2">Dossier</th>
              <th rowspan="2">Parent</th>
              <th colspan="7">Enfant</th>
              <th rowspan="2">Montant total</th>
              <th rowspan="2">Paiement</th>
              <th rowspan="2">Action</th>
            </tr>

            <tr>
              <th>Nom</th>
              <th>Niveau</th>
              <th>Cours</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Prix</th>
              <th>Centre</th>
            </tr>
          </thead>

          <tbody id="parentsTableBody"></tbody>
        </table>
      </div>
    `;

    this.element.querySelector("#searchInput").addEventListener(
      "input",
      () => this.renderTable()
    );

    this.renderTable();

    return this.element;
  }

  // Filtrer les dossiers selon le texte saisi.
  getFilteredData() {
    const query = this.element
      .querySelector("#searchInput")
      .value.trim()
      .toLowerCase();

    return this.storage.getAll()
      .map((parent) => {
        const children = Array.isArray(parent.childs)
          ? parent.childs
          : [];

        const parentText = [
          parent.dossier,
          parent.parent,
          parent.telephone,
          parent.email,
          parent.center
        ].join(" ").toLowerCase();

        const parentMatches = parentText.includes(query);

        const visibleChilds = children.filter((child) => {
          const courses = Array.isArray(child.courses)
            ? child.courses.join(" ")
            : "";

          const childText = [
            child.name,
            child.niveau,
            courses,
            child.status,
            child.date,
            child.prix,
            child.centre,
            child.conter
          ].join(" ").toLowerCase();

          return !query || parentMatches || childText.includes(query);
        });

        return {
          ...parent,
          visibleChilds
        };
      })
      .filter((parent) => parent.visibleChilds.length > 0);
  }

  formatMoney(value) {
    return `${Number(value || 0).toFixed(2)} MAD`;
  }

  formatDate(value) {
    if (!value) return "—";

    return new Date(`${value}T00:00:00`)
      .toLocaleDateString("fr-MA");
  }

  getPaymentStatus(children) {
    if (children.length === 0) return "—";

    if (children.every((child) => child.status === "Payée")) {
      return "Payée";
    }

    if (children.some((child) => child.status === "En attente")) {
      return "En attente";
    }

    return "Validée";
  }

  getStatusClass(status) {
    if (status === "Payée") return "paid";
    if (status === "En attente") return "pending";

    return "validated";
  }

  createCell(value, rowSpan = 1) {
    const cell = document.createElement("td");
    cell.rowSpan = rowSpan;
    cell.textContent = value ?? "";

    return cell;
  }


  renderTable() {
    const tbody = this.element.querySelector("#parentsTableBody");
    const counter = this.element.querySelector("#resultsCount");
    const parents = this.getFilteredData();

    tbody.replaceChildren();

    const totalChildren = parents.reduce(
      (sum, parent) => sum + parent.visibleChilds.length,
      0
    );

    counter.textContent =
      `${parents.length} dossier(s) — ${totalChildren} enfant(s) affiché(s)`;

    if (parents.length === 0) {
      const row = document.createElement("tr");
      const cell = this.createCell("Aucun dossier trouvé.");

      cell.colSpan = 12;
      row.append(cell);
      tbody.append(row);

      return;
    }

    parents.forEach((parent) => {
      const children = parent.visibleChilds;
      const allChildren = Array.isArray(parent.childs)
        ? parent.childs
        : [];

      const rowSpan = children.length;

      const total = allChildren.reduce(
        (sum, child) => sum + Number(child.prix || 0),
        0
      );

      const payment = this.getPaymentStatus(allChildren);

      children.forEach((child, index) => {
        const row = document.createElement("tr");


        if (index === 0) {
          row.append(this.createCell(parent.dossier, rowSpan));

          const parentCell = this.createCell("", rowSpan);

          const name = document.createElement("span");
          name.className = "parent-name";
          name.textContent = parent.parent || "—";

          const phone = document.createElement("span");
          phone.className = "secondary-text";
          phone.textContent = parent.telephone || "—";

          const email = document.createElement("span");
          email.className = "secondary-text";
          email.textContent = parent.email || "—";

          parentCell.append(name, phone, email);
          row.append(parentCell);
        }


        const courses = Array.isArray(child.courses)
          ? child.courses.join(", ")
          : "";

        const values = [
          child.name,
          child.niveau,
          courses,
          child.status,
          this.formatDate(child.date),
          this.formatMoney(child.prix),
          child.centre || child.conter || parent.center || "—"
        ];

        values.forEach((value, valueIndex) => {
          const cell = document.createElement("td");

          if (valueIndex === 3) {
            const badge = document.createElement("span");
            badge.className =
              `status-badge ${this.getStatusClass(value)}`;
            badge.textContent = value || "—";

            cell.append(badge);
          } else {
            cell.textContent = value ?? "";
          }

          row.append(cell);
        });

        if (index === 0) {
          row.append(this.createCell(this.formatMoney(total), rowSpan));

          const paymentCell = this.createCell("", rowSpan);
          const badge = document.createElement("span");

          badge.className =
            `status-badge ${this.getStatusClass(payment)}`;
          badge.textContent = payment;

          paymentCell.append(badge);

          const actionCell = this.createCell("", rowSpan);
          const button = document.createElement("button");
          button.type = "button";
          button.className = "action";
          button.dataset.dossier = parent.dossier;
          button.textContent = "⋯";
          button.setAttribute(
            "aria-label",
            `Voir le dossier ${parent.dossier}`
          );

          actionCell.append(button);
          row.append(paymentCell, actionCell);
        }

        tbody.append(row);
      });
    });
  }
}