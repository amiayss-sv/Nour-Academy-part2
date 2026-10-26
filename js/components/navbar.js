export default class Navbar {
  constructor() {
    this.element = document.createElement("header");
    this.element.className = "site-nav sticky-header";
    this.element.id = "top";
  }

  render() {
    this.element.innerHTML = `
      <div class="page-container">
        <nav
          class="flex items-center space-between"
          aria-label="Principale"
        >
          <a
            class="brand"
            href="#top"
            aria-label="Accueil Nour Academy"
          >
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

          <button
            class="nav-toggle hide-on-desktop"
            type="button"
            aria-expanded="false"
            aria-controls="nav-panel"
            aria-label="Ouvrir le menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div class="nav-panel" id="nav-panel">
            <ul class="nav-menu">
              <li>
                <a class="menu-link" href="#catalogue">Catalogue</a>
              </li>
              <li>
                <a class="menu-link" href="#selection">Ma sélection</a>
              </li>
              <li>
                <a class="menu-link" href="#inscription">Inscription</a>
              </li>
            </ul>

            <div class="nav-cta">
              <a
                class="button button-coral button-small"
                href="#inscription"
              >
                S'inscrire
              </a>
            </div>
          </div>
        </nav>
      </div>
    `;

    this.toggleMenu();

    return this.element;
  }


  toggleMenu() {
    const button = this.element.querySelector(".nav-toggle");
    const panel = this.element.querySelector("#nav-panel");

    const closeMenu = () => {
      panel.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Ouvrir le menu");
    };

    
    button.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");

      button.setAttribute("aria-expanded", String(isOpen));

      button.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    this.element.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        button.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        button.focus();
      }
    });
  }
}