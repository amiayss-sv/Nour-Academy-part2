export default class Catalogue {
  constructor() {
    this.element = document.createElement("section");
    this.element.className = "section bg-cream";
    this.element.id = "catalogue";
  }

  render() {
    this.element.innerHTML = `
    <div class="container">
      <div class="text-center reveal">
        <span class="eyebrow">Nos cours</span>
        <h2 class="section-title">Le bon cours pour chaque niveau</h2>
        <p class="section-lead mx-auto">Filtrez par niveau et par matière pour trouver rapidement le créneau qui convient à votre enfant.</p>
      </div>

      <!-- Barre de filtres : niveau + matière, combinables, sans rechargement (logique ajoutée en JS) -->
      <div class="filters-bar reveal" role="search" aria-label="Filtrer les cours">
        <div class="filter-group">
          <label for="filter-niveau">Niveau</label>
          <select class="form-select" id="filter-niveau" name="niveau">
            <option value="">Tous les niveaux</option>
            <option value="primaire">Primaire</option>
            <option value="college">Collège</option>
            <option value="tronc-commun">Tronc commun</option>
            <option value="1bac">1ère Bac</option>
            <option value="2bac">2ème Bac</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="filter-matiere">Matière</label>
          <select class="form-select" id="filter-matiere" name="matiere">
            <option value="">Toutes les matières</option>
            <option value="maths">Mathématiques</option>
            <option value="physique">Physique-Chimie</option>
            <option value="svt">SVT</option>
            <option value="francais">Français</option>
            <option value="anglais">Anglais</option>
            <option value="arabe">Arabe</option>
          </select>
        </div>
        <div class="filter-results" id="results-count" aria-live="polite">12 cours disponibles</div>
      </div>

      <!--
        Grille des cours : les cartes sont générées dynamiquement en JavaScript
        depuis le tableau de cours (US1 — aucune carte ne doit être écrite en dur
        dans le HTML final). Les cartes ci-dessous sont des EXEMPLES visuels,
        gardés uniquement pour la maquette Figma : à remplacer par la génération JS.
      -->
      <div class="row g-4 mt-2" id="course-list">
        <div class="col-md-6 col-lg-4 reveal">
          <article class="course-card" data-course-id="exemple-1">
            <div class="course-card-head">
              <span class="course-chip subject">Mathématiques</span>
              <span class="course-chip level">2ème Bac</span>
            </div>
            <h3>Maths — Spécialité</h3>
            <p class="course-schedule">Mer. &amp; Sam. · 16h00–17h30</p>
            <div class="course-price"><span class="amt">350 MAD</span><span class="per"> / mois</span></div>
            <p class="course-seats">4 places restantes</p>
            <button class="btn btn-coral w-100 course-add" type="button">Ajouter à ma sélection</button>
          </article>
        </div>
        <div class="col-md-6 col-lg-4 reveal d1">
          <article class="course-card" data-course-id="exemple-2">
            <div class="course-card-head">
              <span class="course-chip subject">Anglais</span>
              <span class="course-chip level">Collège</span>
            </div>
            <h3>Anglais — Conversation</h3>
            <p class="course-schedule">Lun. &amp; Jeu. · 17h30–18h30</p>
            <div class="course-price"><span class="amt">280 MAD</span><span class="per"> / mois</span></div>
            <p class="course-seats">7 places restantes</p>
            <button class="btn btn-coral w-100 course-add" type="button">Ajouter à ma sélection</button>
          </article>
        </div>
        <div class="col-md-6 col-lg-4 reveal d2">
          <article class="course-card" data-course-id="exemple-3">
            <div class="course-card-head">
              <span class="course-chip subject">Physique-Chimie</span>
              <span class="course-chip level">1ère Bac</span>
            </div>
            <h3>Physique-Chimie</h3>
            <p class="course-schedule">Mar. &amp; Ven. · 18h00–19h30</p>
            <div class="course-price"><span class="amt">320 MAD</span><span class="per"> / mois</span></div>
            <p class="course-seats full">Complet</p>
            <button class="btn btn-coral w-100 course-add" type="button" disabled>Complet</button>
          </article>
        </div>
      </div>

      <!-- Message affiché par le JS quand aucun cours ne correspond aux filtres -->
      <p class="no-results" id="no-results" hidden>Aucun cours ne correspond à votre recherche.</p>
    </div>
    `;

    return this.element;
  }
}