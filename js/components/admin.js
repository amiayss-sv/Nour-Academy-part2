import InscriptionsView from "../admin/inscriptions-view.js";

export default class Admin {
  constructor(storage, form) {
    this.storage = storage;
    this.form = form;

    
    this.inscriptionsView = new InscriptionsView(storage,form);

    this.element = document.createElement("div");
    this.element.className = "container admin-layout";
  }

  render(page = "inscription") {
    this.element.innerHTML = `
      <aside class="sidbar">
        <div class="profile">
          <h3>Nour Academy</h3>
          <p>Administration</p>
        </div>
        <a class="dashboard" href="#/tableau-de-bord">
          Dashboard
        </a>
        <a class="listes" href="#/inscriptions">
          Inscriptions
        </a>
        <a class="listes" href="#/accueil">
          Espace parents
        </a>
      </aside>
    <main class="main">
      <div id="admin-content"></div>
        ${page === "dashboard" ? this.renderCards() : ""}
      </main>
    `;

    const content = this.element.querySelector("#admin-content");

    if (page === "inscriptions") {
      content.append(this.inscriptionsView.render());
    }

    return this.element;
  }


  renderCards() {
const dossiers = this.storage.getAll();
let number_etudiant = 0;
let enAttente = 0;
let revenus = 0;

for (let i = 0; i < dossiers.length; i++) {
  const enfants = dossiers[i].childs;

  if (!Array.isArray(enfants)) continue;

  for (let j = 0; j < enfants.length; j++) {
    const enfant = enfants[j];
    number_etudiant++;
    if (enfant.status === "En attente") {
      enAttente++;
    }
    if (enfant.status === "Payée") {
      revenus += Number(enfant.prix || 0);
    }
  }
}

const nbDossiers = dossiers.length;

    return `
      <section class="cards">
        <article class="card">
          <div class="icon purple">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 3 5 5-9 13-7-4 4-14Z"/>
              <circle cx="13" cy="8" r="1"/>
              <path d="m9 12 5 3M8 15l3 2"/>
            </svg>
          </div>

          <div>
           <h2>${nbDossiers}</h2>
            <p>Monthly Subscription</p>
          </div>
        </article>

        <article class="card">
          <div class="icon blue">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="5" width="16" height="16" rx="2"/>
              <path d="M8 3v4M16 3v4M4 11h16M8 15h2M14 15h2"/>
            </svg>
          </div>

          <div>
              <h2>${revenus.toFixed(2)} <strong>MAD</strong></h2>
            <p>Chiffre d'affaires</p>
          </div>
        </article>

        <article class="card">
          <div class="icon pink">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 4H5v16h6M9 12h12M17 8l4 4-4 4"/>
              <path d="m8 4 5 2v12l-5 2Z"/>
            </svg>
          </div>

          <div>
           <h2>${enAttente}</h2>
            <p>Churn Rate</p>
          </div>
        </article>

        <article class="card">
          <div class="icon orange">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4" width="18" height="5" rx="1"/>
              <path d="M7 6.5h.01M11 6.5h6M6 9v5h4"/>
              <circle cx="16" cy="16" r="5"/>
              <path d="M16 13v6M18 14h-3a1 1 0 0 0 0 2h2a1 1 0 0 1 0 2h-3"/>
            </svg>
          </div>

          <div>
            <h2>${number_etudiant}</h2>
            <p>Total Subscription</p>
          </div>
        </article>
      </section>
    `;


  }
}