import Store from "../store.js";

export default class Selection {
  constructor(store = new Store()) {
    this.element = document.createElement("section");
    this.element.className = "section";
    this.element.id = "selection";
    this.store = store;
  }

  render() {
    this.element.innerHTML = `
      <div class="container">
        <div class="text-center reveal">
          <span class="eyebrow leaf">Votre panier</span>

          <h2 class="section-title">Ma sélection de cours</h2>

          <p class="section-lead mx-auto">
            Ajoutez des cours depuis le catalogue ci-dessus ; retirez-les
            ici si besoin. Un même cours ne peut pas être ajouté deux fois.
          </p>
        </div>

        <div class="selection-wrap mt-4 reveal">
          <div class="selection-list" id="selection-list"></div>

          <div class="selection-summary">
            <div class="selection-total">
              <span>Total mensuel</span>
              <strong id="selection-total-amount">0 MAD</strong>
            </div>

            <a class="btn btn-coral btn-lg" href="#inscription">
              Continuer vers l'inscription
            </a>
          </div>
        </div>
      </div>
    `;

    this.renderCourses();
    this.removeCours();

    return this.element;
  }

  renderCourses() {
    const list = this.element.querySelector("#selection-list");
    const totalElement = this.element.querySelector(
      "#selection-total-amount"
    );

    list.innerHTML = "";

    // Keep only one course for each ID.
    const ids = new Set();
    const courses = this.store.getCours().filter((course) => {
      const id = String(course.id);

      if (ids.has(id)) return false;

      ids.add(id);
      return true;
    });

    const total = courses.reduce(
      (sum, course) => sum + Number(course.price),
      0
    );

    totalElement.textContent = `${total} MAD`;

    if (courses.length === 0) {
      const message = document.createElement("p");
      message.className = "selection-empty";
      message.textContent = "Aucun cours sélectionné pour le moment.";
      list.append(message);
      return;
    }

    courses.forEach((course) => {
      const item = document.createElement("div");
      item.className = "selection-item";
      item.dataset.courseId = course.id;

      item.innerHTML = `
        <div class="selection-item-info">
          <strong></strong>
          <span></span>
        </div>

        <div class="selection-item-price"></div>

        <button
          class="selection-remove"
          type="button"
          aria-label="Retirer ce cours"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      `;

      item.querySelector("strong").textContent = course.title;

      item.querySelector("span").textContent =
        `${course.levelLabel} · ${course.schedule}`;

      item.querySelector(".selection-item-price").textContent =
        `${course.price} MAD`;

      item.querySelector(".selection-remove").setAttribute(
        "aria-label",
        `Retirer ${course.title}`
      );

      list.append(item);
    });
  }

  removeCours() {
    const list = this.element.querySelector("#selection-list");

    list.addEventListener("click", (event) => {
      const button = event.target.closest(".selection-remove");
      if (!button) return;

      const item = button.closest(".selection-item");
      const id = item.dataset.courseId;

      // Remove any stored duplicates of this course too.
      const courses = this.store.getCours().filter(
        (course) => String(course.id) === id
      );

      courses.forEach((course) => {
        this.store.removeCours(course);
      });

      this.renderCourses();
    });
  }
}