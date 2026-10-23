
export default class RegistrationForm {
  constructor() {
    this.element = document.createElement("section");
    this.element.className = "section bg-cream-2";
    this.element.id = "inscription";
  }
  
  render() {
    this.element.innerHTML = `
    <div class="container">
      <div class="enroll-band reveal">
        <div class="row g-4 align-items-center">
          <div class="col-lg-5">
            <span class="eyebrow" style="background:rgba(255,255,255,.2);color:#fff;">Dernière étape</span>
            <h2>Complétez le dossier d'inscription</h2>
            <p class="lead">Chaque champ est vérifié au fur et à mesure de la saisie pour éviter les dossiers incomplets ou erronés.</p>
            <div class="mt-4">
              <div class="enroll-perk"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Validation en temps réel des champs</div>
              <div class="enroll-perk"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Envoi bloqué tant que le dossier n'est pas complet</div>
              <div class="enroll-perk"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Numéro de dossier unique à la confirmation</div>
            </div>
          </div>

          <div class="col-lg-7">
            <form class="registration-form" id="registration-form" novalidate>
              <h3>Formulaire d'inscription</h3>
              <p class="form-note mb-3">Les champs marqués sont nécessaires pour valider votre dossier.</p>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="form-label" for="rf-parent">Nom du parent</label>
                  <input class="form-control" id="rf-parent" name="parent" type="text" required autocomplete="name" placeholder="Nom et prénom">
                  <span class="field-error">Veuillez saisir votre nom.</span>
                  <span class="field-success">Nom valide.</span>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="rf-email">Email</label>
                  <input class="form-control" id="rf-email" name="email" type="email" required autocomplete="email" placeholder="vous@email.com">
                  <span class="field-error">Veuillez saisir un email valide.</span>
                  <span class="field-success">Email valide.</span>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="rf-phone">Téléphone</label>
                  <input class="form-control" id="rf-phone" name="phone" type="tel" required autocomplete="tel" placeholder="06 12 34 56 78">
                  <span class="field-error">Format attendu : 06/07 + 8 chiffres, ou +212 6/7 + 8 chiffres.</span>
                  <span class="field-success">Numéro valide.</span>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="rf-child">Prénom de l'élève</label>
                  <input class="form-control" id="rf-child" name="child" type="text" required placeholder="Prénom de l'enfant">
                  <span class="field-error">Veuillez saisir le prénom de l'élève.</span>
                  <span class="field-success">Prénom valide.</span>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="rf-level">Niveau de l'élève</label>
                  <select class="form-select" id="rf-level" name="level" required>
                    <option value="">Choisir un niveau…</option>
                    <option value="primaire">Primaire</option>
                    <option value="college">Collège</option>
                    <option value="tronc-commun">Tronc commun</option>
                    <option value="1bac">1ère Bac</option>
                    <option value="2bac">2ème Bac</option>
                  </select>
                  <span class="field-error">Veuillez choisir un niveau.</span>
                  <span class="field-success">Niveau choisi.</span>
                </div>
                <div class="col-sm-6"></div>
                <div class="col-sm-6">
                  <label class="form-label" for="rf-password">Mot de passe</label>
                  <input class="form-control" id="rf-password" name="password" type="password" required autocomplete="new-password" placeholder="8 caractères minimum">
                  <span class="field-error">8 caractères min., avec majuscule, chiffre et caractère spécial.</span>
                  <span class="field-success">Mot de passe valide.</span>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="rf-password-confirm">Confirmer le mot de passe</label>
                  <input class="form-control" id="rf-password-confirm" name="passwordConfirm" type="password" required autocomplete="new-password" placeholder="Retapez le mot de passe">
                  <span class="field-error">Les mots de passe ne correspondent pas.</span>
                  <span class="field-success">Les mots de passe correspondent.</span>
                </div>
                <div class="col-12">
                  <div class="form-check-row">
                    <input type="checkbox" id="rf-consent" name="consent" required>
                    <label for="rf-consent">J'accepte que mes données soient utilisées uniquement pour traiter cette inscription, conformément à la loi 09-08 relative à la protection des données à caractère personnel (CNDP).</label>
                  </div>
                  <span class="field-error">Le consentement est obligatoire pour envoyer le dossier.</span>
                </div>
                <div class="col-12">
                  <button class="btn btn-coral btn-lg w-100" type="submit">Envoyer mon inscription</button>
                  <p class="form-note text-center mt-2 mb-0">L'envoi est bloqué si un champ est invalide, si la sélection est vide ou si le consentement n'est pas coché.</p>
                </div>
              </div>
            </form>

            <!--
              Récapitulatif affiché après un envoi réussi (US5), à la place du
              formulaire. Contenu statique ci-dessous = exemple pour la maquette ;
              le numéro de dossier et le récapitulatif réel sont générés en JS.
            -->
            <div class="form-success" id="registration-success" role="status">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/><path d="m8 12 2.5 2.5L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <div>Dossier reçu ! Voici votre récapitulatif :</div>
              <ul class="confirmation-list">
                <li>Élève : <strong>Prénom Nom</strong></li>
                <li>Cours sélectionnés : <strong>Maths — Spécialité</strong></li>
                <li>Total mensuel : <strong>350 MAD</strong></li>
                <li>Numéro de dossier : <strong>NA-2026-00123</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    `;

    return this.element;
  }
}