import Store from "../store.js";

export default class Catalogue  {
  constructor(store =  new Store()) {
    this.element = document.createElement("section");
    this.element.className = "section bg-cream";
    this.element.id = "catalogue";
    this.courses = [];
    this.store = store;
    this.selection = null;
  }

  async fetchJsonFile() {
  const response = await fetch(
    new URL("../courses.json", import.meta.url)
  );

  this.courses = await response.json();
  const selectedCourses = this.store.getCours();


  this.courses.forEach((course) => {
    const isSelected = selectedCourses.some(
      (selected) => String(selected.id) === String(course.id)
    );
    course.seats = isSelected ? 0 : 1;
    
    this.store.setSeats(course.id, course.seats);
  });
}


  renderSubjects() {
    const selectSubject = this.element.querySelector("#filter-matiere");
    const selectLevel = this.element.querySelector("#filter-niveau");

    const subjects = new Set();
    const levels = new Set();

    this.courses.forEach((course) => {
      if (!subjects.has(course.subject)) {
        const option = document.createElement("option");

        option.value = course.subject;
        option.textContent = course.subjectLabel;
        selectSubject.append(option);
        subjects.add(course.subject);
      }

      if (!levels.has(course.level)) {
        const option = document.createElement("option");

        option.value = course.level;
        option.textContent = course.levelLabel;

        selectLevel.append(option);
        levels.add(course.level);
      }
    });
  }

  bindEvents() {
    const selectSubject = this.element.querySelector("#filter-matiere");
    const selectLevel = this.element.querySelector("#filter-niveau");

    selectSubject.addEventListener("change", () => {
      this.filterCourses();
    });

    selectLevel.addEventListener("change", () => {
      this.filterCourses();
    });
  }

  filterCourses() {
    const subject = this.element.querySelector("#filter-matiere").value;
    const level = this.element.querySelector("#filter-niveau").value;

    const filteredCourses = this.courses.filter((course) => {
      const matchesSubject =
        subject === "" || course.subject === subject;

      const matchesLevel =
        level === "" || course.level === level;

      return matchesSubject && matchesLevel;
    });

    this.renderCourses(filteredCourses);
  }

  async render() {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="center-text reveal">
          <span class="eyebrow">Nos cours</span>

          <h2 class="section-title">
            Le bon cours pour chaque niveau
          </h2>

          <p class="section-lead center-block">
            Filtrez par niveau et par matière pour trouver rapidement
            le créneau qui convient à votre enfant.
          </p>
        </div>

        <div
          class="filters-bar reveal"
          role="search"
          aria-label="Filtrer les cours"
        >
          <div class="filter-group">
            <label for="filter-niveau">Niveau</label>

            <select
              class="field-select"
              id="filter-niveau"
              name="niveau"
            >
              <option value="">Tous les niveaux</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="filter-matiere">Matière</label>

            <select
              class="field-select"
              id="filter-matiere"
              name="matiere"
            >
              <option value="">Toutes les matières</option>
            </select>
          </div>

          <div
            class="filter-results"
            id="results-count"
            aria-live="polite"
          ></div>
        </div>

        <div
          class="layout-row spacing-large space-top-small"
          id="course-list"
        ></div>

        <p
          class="no-results"
          id="no-results"
          role="status"
          hidden
        >
          Aucun cours ne correspond à votre recherche.
        </p>
      </div>
    `;

    try {
      await this.fetchJsonFile();

      this.renderSubjects();
      this.renderCourses();
      this.bindEvents();
      this.addCours();
    } catch (error) {
      console.error(error);
      const message = this.element.querySelector("#no-results");
      message.hidden = false;
      message.textContent =
        "Impossible de charger les cours. Veuillez réessayer.";
    }

    return this.element;
  }

  renderCourses(courses = this.courses) {
    const list = this.element.querySelector("#course-list");
    const count = this.element.querySelector("#results-count");
    const message = this.element.querySelector("#no-results");

    list.innerHTML = "";

    const fragment = document.createDocumentFragment();

    courses.forEach((course) => {
      const column = document.createElement("div");
      column.className = "width-half-medium width-third-large";

      const article = document.createElement("article");
      article.className = "course-card";
      article.dataset.courseId = course.id;

      article.innerHTML = `
        <div class="course-card-head">
          <span class="course-chip subject"></span>
          <span class="course-chip level"></span>
        </div>

        <h3></h3>

        <p class="course-schedule"></p>

        <div class="course-price">
          <span class="amt"></span>
          <span class="per"> / mois</span>
        </div>

        <button
          class="button button-coral full-width course-add"
          type="button"
        ></button>
      `;

      article.querySelector(".subject").textContent =
        course.subjectLabel;

      article.querySelector(".level").textContent =
        course.levelLabel;

      article.querySelector("h3").textContent = course.title;

      article.querySelector(".course-schedule").textContent =
        course.schedule;

      article.querySelector(".amt").textContent =
        `${course.price} MAD`;

      const button = article.querySelector(".course-add");
      const isComplete = course.seats <= 0;

      button.disabled = isComplete;

      button.textContent = isComplete
        ? "Complet"
        : "Ajouter à ma sélection";

      column.append(article);
      fragment.append(column);
    });

    list.append(fragment);

    count.textContent = `${courses.length} cours affichés`;
    message.hidden = courses.length > 0;
  }

  addCours() {
    const list = this.element.querySelector("#course-list");

    list.addEventListener("click", (event) => {
      const button = event.target.closest(".course-add");
      if (!button || button.disabled) return;

      const article = button.closest(".course-card");
      const id = article.dataset.courseId;

      const course = this.courses.find(
        (course) => String(course.id) === id
      );


      if (!course || course.seats <= 0) return;
      this.store.setCours(course);

      this.store.setSeats(course.id, 0);
      course.seats = 0;
      button.disabled = true;
      button.textContent = "Complet";
      this.selection.renderMycours();
    });
  }
}