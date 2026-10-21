export default class Selection {
  constructor() {
    this.element = document.createElement("section");
    this.element.className = "section";
    this.element.id = "selection";
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
          <div class="selection-list" id="selection-list">
            <div class="selection-item" data-course-id="exemple-1">
              <div class="selection-item-info">
                <strong>Maths — Spécialité</strong>
                <span>2ème Bac · Mer. &amp; Sam. 16h00–17h30</span>
              </div>

              <div class="selection-item-price">350 MAD</div>

              <button
                class="selection-remove"
                type="button"
                aria-label="Retirer Maths — Spécialité"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>

            <p class="selection-empty" id="selection-empty" hidden>
              Aucun cours sélectionné pour le moment.
            </p>
          </div>

          <div class="selection-summary">
            <div class="selection-total">
              <span>Total mensuel</span>
              <strong id="selection-total-amount">350 MAD</strong>
            </div>

            <a class="btn btn-coral btn-lg" href="#inscription">
              Continuer vers l'inscription
            </a>
          </div>
        </div>
      </div>
    `;

    return this.element;
  }
}