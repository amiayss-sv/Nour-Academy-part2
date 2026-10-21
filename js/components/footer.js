export default class Footer {
  constructor() {
    this.element = document.createElement("footer");
    this.element.className = "site-footer";
  }

  render() {
    this.element.innerHTML = `
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <a class="brand" href="#top">
              <span class="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 7c-2.5-2-6-2-9-1v12c3-1 6.5-1 9 1 2.5-2 6-2 9-1V6c-3-1-6.5-1-9 1Z"
                    stroke="#fff"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 7v12"
                    stroke="#fff"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              Nour Academy
            </a>

            <p>
              Réseau de 3 centres de soutien scolaire et de langues
              à Nador, du primaire au Bac.
            </p>
          </div>

          <div class="col-6 col-lg-3">
            <h4>Navigation</h4>

            <ul class="footer-links">
              <li><a href="#catalogue">Catalogue</a></li>
              <li><a href="#selection">Ma sélection</a></li>
              <li><a href="#inscription">Inscription</a></li>
            </ul>
          </div>

          <div class="col-lg-5">
            <h4>Nos centres</h4>

            <ul class="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>

                <span>Nador Centre · Hay Al Matar · Selouane</span>
              </li>

              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 5c0 8.3 6.7 15 15 15v-3.5l-4-1.5-2 2a12 12 0 0 1-6-6l2-2L7.5 4H4Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>
                  <a href="tel:+212536000000" style="color:#fff;">
                    05 36 00 00 00
                  </a>
                </span>
              </li>

              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>
                  <a
                    href="mailto:contact@nour-academy.ma"
                    style="color:#fff;"
                  >
                    contact@nour-academy.ma
                  </a>
                </span>
              </li>
            </ul>

            <div class="mt-3">
              <div class="footer-hours">
                <span>Lundi – Samedi</span>
                <span>9h00 – 19h00</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 Nour Academy. Tous droits réservés.</span>
          <span>Données traitées conformément à la loi 09-08 (CNDP).</span>
        </div>
      </div>
    `;

    return this.element;
  }
}