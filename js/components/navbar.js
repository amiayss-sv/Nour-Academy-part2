
export default class Navbar {
    constructor() {
        this.element = document.createElement("header");
        this.element.className = "site-nav sticky-top";
        this.element.id="top";
    }

    render() {

        this.element.innerHTML = ` 
          <div class="container">
        <nav class="d-flex align-items-center justify-content-between" aria-label="Principale">
            <a class="brand" href="#top" aria-label="Accueil Nour Academy">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-2.5-2-6-2-9-1v12c3-1 6.5-1 9 1 2.5-2 6-2 9-1V6c-3-1-6.5-1-9 1Z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 7v12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
        Nour Academy
      </a>
      <button class="nav-toggle d-lg-none" aria-expanded="false" aria-controls="nav-panel" aria-label="Ouvrir le menu">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-panel" id="nav-panel">
        <ul class="nav-menu">
          <li><a class="nav-link" href="#catalogue">Catalogue</a></li>
          <li><a class="nav-link" href="#selection">Ma sélection</a></li>
          <li><a class="nav-link" href="#inscription">Inscription</a></li>
        </ul>
        <div class="nav-cta">
          <a class="btn btn-coral btn-sm" href="#inscription">S'inscrire</a>
        </div>
      </div>
    </nav>
  </div>
        `;

    return this.element;
    }


}