import Action from "../components/action.js";

export default class InscriptionsView {
  constructor(storage, form) {
    this.storage = storage;
    this.form = form;
    this.element = document.createElement("section");
    this.element.className = "inscriptions-view";
    this.element.addEventListener("click", (event) => {
      const editButton = event.target.closest(".btn-modifier");

      if (editButton) {
        const menu = editButton.closest(".action-menu");
        const wrapper = menu.parentElement;
        const button = wrapper.querySelector(".action");
        const dossierNumber = button.dataset.dossier;
        const dossier = this.storage.getAll().find(
          (item) => item.dossier === dossierNumber
        );

        if (!dossier) return;
        this.form.prepareEdit(dossier);
        window.location.hash = "#/inscription";
        return;
      }

      const deleteButton = event.target.closest(".btn-supprimer");
      if (deleteButton) {
        const menu = deleteButton.closest(".action-menu");
        const wrapper = menu.parentElement;
        const button = wrapper.querySelector(".action");
        const dossierNumber = button.dataset.dossier;
        this.storage.remove(dossierNumber);
        this.renderTable();
        return;
      }
      const button = event.target.closest(".action");
      if (!button) return;
      const menu = button.parentElement.querySelector(".action-menu");
      if (menu) {
        menu.remove();
        return;
      }
      const action = new Action();
      button.after(action.render());
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="rech-statu">
        <div class="input">
          <input
            type="search"
            id="searchInput"
            placeholder="Nom du parent, enfant, dossier..."
            autocomplete="off"
          >
        </div>
        <div class="status">
          <select class="field-status" id="status">
            <option value="">Tous les statuts</option>
            <option value="attendus">En attente</option>
            <option value="accepté">Accepté / Payé</option>
            <option value="refusé">Refusé</option>
          </select>
        </div>
      </div>
      <div class="status">
                  <label for="sortBy">Trier par</label>

                  <select class="field-status" id="sortBy">
                    <option value="date">Date</option>
                    <option value="parent">Nom du parent</option>
                    <option value="dossier">Numéro de dossier</option>
                    <option value="centre">Centre</option>
                    <option value="montant">Montant total</option>
                  </select>
                </div>

                <div class="status">
                  <label for="sortDirection">Ordre</label>

                  <select class="field-status" id="sortDirection">
                    <option value="desc">Décroissant</option>
                    <option value="asc">Croissant</option>
                  </select>
                </div>
      <p id="resultsCount" aria-live="polite"></p>

      <div class="table-container">
        <table>
         
          <thead>
            <tr>
              <th>Dossier</th>
              <th>Parent</th>
              <th>Nom enfant</th>
              <th>Niveau</th>
              <th>Cours</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Prix</th>
              <th>Centre</th>
              <th>Montant total</th>
              <th>Paiement</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="parentsTableBody"></tbody>
        </table>
      </div>
    `;


    this.element.querySelector("#searchInput").addEventListener("input", () => this.renderTable());
    this.element.querySelector("#sortBy").addEventListener(
      "change",
      () => this.renderTable()
    );

    this.element.querySelector("#sortDirection").addEventListener(
      "change",
      () => this.renderTable()
    );
    this.filterStatus();
    this.renderTable();
    return this.element;
  }

  getFilteredData() {
    const query = this.element
      .querySelector("#searchInput")
      .value.trim()
      .toLowerCase();

    const statut = this.element.querySelector("#status").value;
    const dossiers = this.storage.getAll();
    const result = [];
    const statusMap = {
      "En attente": "attendus",
      "Validée": "accepté",
      "Payée": "accepté",
      "Refusée": "refusé",
    };

    for (let i = 0; i < dossiers.length; i++) {
      const parent = dossiers[i];

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
      const visibleChilds = [];

      for (let j = 0; j < children.length; j++) {
        const child = children[j];
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

        const matchSearch =
          !query || parentMatches || childText.includes(query);

        const childStatus =
          statusMap[child.status] ||
          (child.status ? child.status.toLowerCase() : "");

        const matchStatus =
          !statut || childStatus === statut;

        if (matchSearch && matchStatus) {
          visibleChilds.push(child);
        }
      }

      if (visibleChilds.length > 0) {
        result.push({
          ...parent,
          visibleChilds
        });
      }
    }

    const sortBy = this.element.querySelector("#sortBy").value;

    const direction =
      this.element.querySelector("#sortDirection").value === "asc"
        ? 1
        : -1;

    result.sort((a, b) => {
      const childA = a.visibleChilds[0] || {};
      const childB = b.visibleChilds[0] || {};
      let valueA;
      let valueB;
      if (sortBy === "parent") {
        valueA = a.parent || "";
        valueB = b.parent || "";
      } else if (sortBy === "dossier") {
        valueA = a.dossier || "";
        valueB = b.dossier || "";
      } else if (sortBy === "centre") {
        valueA = childA.centre || childA.conter || a.center || "";
        valueB = childB.centre || childB.conter || b.center || "";
      } else if (sortBy === "montant") {
        valueA = this.getDossierTotal(a);
        valueB = this.getDossierTotal(b);

        return (valueA - valueB) * direction;
      } else {
        valueA = childA.date || "";
        valueB = childB.date || "";
      }

      return String(valueA).localeCompare(
        String(valueB),
        "fr",
        { numeric: true, sensitivity: "base" }
      ) * direction;
    });


    return result;
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

    let paid = 0;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.paymentStatus === "Payée" || child.status === "Payée") {
        paid++;
      }
    }

    if (paid === children.length) {
      return "Payée";
    }

    if (paid > 0) {
      return "Partiellement payée";
    }

    return "Non payée";
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
    let totalChildren = 0;
    for (let i = 0; i < parents.length; i++) {
      totalChildren += parents[i].visibleChilds.length;
    }
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

    for (let i = 0; i < parents.length; i++) {
      const parent = parents[i];

      const children = parent.visibleChilds;

      const allChildren = Array.isArray(parent.childs)
        ? parent.childs
        : [];

      const rowSpan = children.length;

      let total = 0;

      for (let j = 0; j < allChildren.length; j++) {
        total += Number(allChildren[j].prix || 0);
      }

      const payment = this.getPaymentStatus(allChildren);

      for (let j = 0; j < children.length; j++) {
        const child = children[j];
        const row = document.createElement("tr");
        if (j === 0) {
          row.append(
            this.createCell(parent.dossier, rowSpan)
          );

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

        for (let k = 0; k < values.length; k++) {
          const cell = document.createElement("td");
          const value = values[k];

          if (k === 3) {
            const badge = document.createElement("span");

            badge.className =
              `status-badge ${this.getStatusClass(value)}`;

            badge.textContent = value || "—";
            cell.append(badge);
          } else {
            cell.textContent = value ?? "";
          }

          row.append(cell);
        }

        if (j === 0) {
          row.append(
            this.createCell(this.formatMoney(total), rowSpan)
          );

          const paymentCell = this.createCell("", rowSpan);
          const paymentBadge = document.createElement("span");

          paymentBadge.className =
            `status-badge ${this.getStatusClass(payment)}`;

          paymentBadge.textContent = payment;
          paymentCell.append(paymentBadge);

          const actionCell = this.createCell("", rowSpan);

          const button = document.createElement("button");
          button.type = "button";
          button.className = "action";
          button.dataset.dossier = parent.dossier;
          button.textContent = "⋯";

          button.setAttribute(
            "aria-label",
            `Actions pour le dossier ${parent.dossier}`
          );

          const wrapper = document.createElement("div");
          wrapper.className = "action-wrapper";

          wrapper.append(button);
          actionCell.append(wrapper);

          row.append(paymentCell, actionCell);
        }

        tbody.append(row);
      }
    }
  }

  filterStatus() {
    const select = this.element.querySelector("#status");

    select.addEventListener("change", () => {
      this.renderTable();
    });
  }
}