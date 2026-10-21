export default class Hero {
  constructor() {
    this.element = document.createElement("section");
    this.element.className = "hero";
  }

  render() {
    this.element.innerHTML = `
           <div class="hero-decor" aria-hidden="true">
      <span class="shape s1">📚</span>
      <span class="shape s2">✏️</span>
    </div>
    
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy reveal">
          <span class="eyebrow sun">Espace parents — Nour Academy</span>
          <h1>Trouvez le bon cours, <span class="squiggle">sans vous déplacer</span></h1>
          <p class="hero-lead">Nour Academy accompagne vos enfants du primaire au Bac dans ses 3 centres de Nador. Parcourez le catalogue, choisissez vos cours et envoyez un dossier d'inscription complet en quelques minutes.</p>
          <div class="hero-cta">
            <a class="btn btn-coral btn-lg" href="#catalogue">Voir les cours</a>
            <a class="btn btn-ghost btn-lg" href="#inscription">Commencer l'inscription</a>
          </div>
          <div class="hero-trust">
            <span class="dot"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> 3 centres à Nador</span>
            <span class="dot"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> +1 400 élèves accompagnés / an</span>
            <span class="dot"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Dossier vérifié à la saisie</span>
          </div>
        </div>

        <div class="hero-visual reveal d2">
          <span class="hero-blob b1" aria-hidden="true"></span>
          <span class="hero-blob b2" aria-hidden="true"></span>
          <div class="hero-photo-wrap">
            <img src="img/hero-classroom.jpg" alt="Une salle de classe lumineuse avec des élèves en cours de soutien" width="640" height="720" fetchpriority="high">
          </div>
          <div class="hero-badge b-ratio">
            <span class="hb-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span><small>Toutes matières</small>Du primaire au Bac</span>
          </div>
          <div class="hero-badge b-licensed">
            <span class="hb-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span><small>Données protégées</small>Conforme à la loi 09-08</span>
          </div>
        </div>
      </div>
    </div>
    `;

    return this.element;
  }
}