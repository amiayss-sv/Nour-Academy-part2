
export default class RegistrationForm {
  constructor() {
    this.element = document.createElement("section");
    this.element.className = "section bg-cream-2";
    this.element.id = "inscription";
  }
  
  render() {
    this.element.innerHTML = `
    <div class="page-container">
      <div class="enroll-band reveal">
        <div class="layout-row spacing-large items-center">
          <div class="width-five-large">
            <span class="eyebrow" style="background:rgba(255,255,255,.2);color:#fff;">Dernière étape</span>
            <h2>Complétez le dossier d'inscription</h2>
            <p class="intro-text">Chaque champ est vérifié au fur et à mesure de la saisie pour éviter les dossiers incomplets ou erronés.</p>
            <div class="space-top-large">
              <div class="enroll-perk"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Validation en temps réel des champs</div>
              <div class="enroll-perk"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Envoi bloqué tant que le dossier n'est pas complet</div>
              <div class="enroll-perk"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Numéro de dossier unique à la confirmation</div>
            </div>
          </div>

          <div class="width-seven-large">
            <form class="registration-form" id="registration-form" novalidate>
              <h3>Formulaire d'inscription</h3>
              <p class="form-note space-bottom-medium">Les champs marqués sont nécessaires pour valider votre dossier.</p>
              <div class="layout-row spacing-small">
                <div class="width-half-small">
                  <label class="field-label" for="rf-parent">Nom du parent</label>
                  <input class="field-input" id="rf-parent" name="parent" type="text" required autocomplete="name" placeholder="Nom et prénom">
                  <span class="field-error">Veuillez saisir votre nom.</span>
                  <span class="field-success">Nom valide.</span>
                </div>
                <div class="width-half-small">
                  <label class="field-label" for="rf-email">Email</label>
                  <input class="field-input" id="rf-email" name="email" type="email" required autocomplete="email" placeholder="vous@email.com">
                  <span class="field-error">Veuillez saisir un email valide.</span>
                  <span class="field-success">Email valide.</span>
                </div>
                <div class="width-half-small">
                  <label class="field-label" for="rf-phone">Téléphone</label>
                  <input class="field-input" id="rf-phone" name="phone" type="tel" required autocomplete="tel" placeholder="06 12 34 56 78">
                  <span class="field-error">Format attendu : 06/07 + 8 chiffres, ou +212 6/7 + 8 chiffres.</span>
                  <span class="field-success">Numéro valide.</span>
                </div>
                <div class="width-half-small">
                  <label class="field-label" for="rf-child">Prénom de l'élève</label>
                  <input class="field-input" id="rf-child" name="child" type="text" required placeholder="Prénom de l'enfant">
                  <span class="field-error">Veuillez saisir le prénom de l'élève.</span>
                  <span class="field-success">Prénom valide.</span>
                </div>
                <div class="width-half-small">
                  <label class="field-label" for="rf-level">Niveau de l'élève</label>
                  <select class="field-select" id="rf-level" name="level" required>
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
                <div class="width-half-small"></div>
                <div class="width-half-small">
                  <label class="field-label" for="rf-password">Mot de passe</label>
                  <input class="field-input" id="rf-password" name="password" type="password" required autocomplete="new-password" placeholder="8 caractères minimum">
                  <span class="field-error">8 caractères min., avec majuscule, chiffre et caractère spécial.</span>
                  <span class="field-success">Mot de passe valide.</span>
                </div>
                <div class="width-half-small">
                  <label class="field-label" for="rf-password-confirm">Confirmer le mot de passe</label>
                  <input class="field-input" id="rf-password-confirm" name="passwordConfirm" type="password" required autocomplete="new-password" placeholder="Retapez le mot de passe">
                  <span class="field-error">Les mots de passe ne correspondent pas.</span>
                  <span class="field-success">Les mots de passe correspondent.</span>
                </div>
                <div class="width-full">
                  <div class="form-check-row">
                    <input type="checkbox" id="rf-consent" name="consent" required>
                    <label for="rf-consent">J'accepte que mes données soient utilisées uniquement pour traiter cette inscription, conformément à la loi 09-08 relative à la protection des données à caractère personnel (CNDP).</label>
                  </div>
                  <span class="field-error">Le consentement est obligatoire pour envoyer le dossier.</span>
                </div>
                <div class="width-full">
                  <button class="button button-coral button-large full-width" type="submit">Envoyer mon inscription</button>
                  <p class="form-note center-text space-top-small no-bottom-space">L'envoi est bloqué si un champ est invalide, si la sélection est vide ou si le consentement n'est pas coché.</p>
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


    this.handllerForm();
    return this.element;
  }



  handllerForm() {

  const form = this.element.querySelector("#registration-form");
  const success = this.element.querySelector("#registration-success");

  const parent = form.querySelector("#rf-parent");
  const email = form.querySelector("#rf-email");
  const phone = form.querySelector("#rf-phone");
  const child = form.querySelector("#rf-child");
  const level = form.querySelector("#rf-level");
  const password = form.querySelector("#rf-password");
  const confirmPassword = form.querySelector("#rf-password-confirm");
  const consent = form.querySelector("#rf-consent");

  
  const fields = [
    parent,
    email,
    phone,
    child,
    level,
    password,
    confirmPassword,
    consent,
  ];

  success.hidden = true;
  success.style.display = "none";

  const isValidPhone = (value) => {

    let number = value.split(" ").join("");

    if (number.startsWith("+212")) {
      number = "0" + number.slice(4);
    }

    const onlyDigits = [...number].every((character) =>
      "0123456789".includes(character)
    );

    return (
      number.length === 10 &&
      (number.startsWith("06") || number.startsWith("07")) &&
      onlyDigits
    );
  };


  const isValidPassword = (value) => {
    const characters = [...value];

    const hasUppercase = characters.some((character) =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(character)
    );

    const hasNumber = characters.some((character) =>
      "0123456789".includes(character)
    );

    const hasSpecial = characters.some(
      (character) =>
        !"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          .includes(character) &&
        character.trim() !== ""
    );

    return (
      value.length >= 8 &&
      hasUppercase &&
      hasNumber &&
      hasSpecial
    );
  };

  const validateField = (field) => {
    let valid = false;

    if (field === parent || field === child) {
      valid = field.value.trim().length > 0;
    } else if (field === email) {
      valid = field.value.trim() !== "" && field.validity.valid;
    } else if (field === phone) {
      valid = isValidPhone(field.value);
    } else if (field === level) {
      valid = field.value !== "";
    } else if (field === password) {
      valid = isValidPassword(field.value);
    } else if (field === confirmPassword) {
      valid =
        field.value !== "" &&
        field.value === password.value;
    } else if (field === consent) {
      valid = field.checked;
    }

    // Consent messages belong to the outer container.
    const container =
      field === consent
        ? field.closest(".width-full")
        : field.parentElement;

    const errorMessage = container.querySelector(".field-error");
    const successMessage = container.querySelector(".field-success");

    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);
    field.setAttribute("aria-invalid", String(!valid));

    if (errorMessage) {
      errorMessage.hidden = valid;
      errorMessage.style.display = valid ? "none" : "block";
    }

    if (successMessage) {
      successMessage.hidden = !valid;
      successMessage.style.display = valid ? "block" : "none";
    }

    return valid;
  };

  fields.forEach((field) => {
    const container =
      field === consent
        ? field.closest(".width-full")
        : field.parentElement;

    // Hide feedback until the user interacts with the field.
    container
      .querySelectorAll(".field-error, .field-success")
      .forEach((message) => {
        message.hidden = true;
        message.style.display = "none";
      });

    const errorMessage = container.querySelector(".field-error");

    if (errorMessage) {
      errorMessage.id = `${field.id}-error`;
      field.setAttribute("aria-describedby", errorMessage.id);
      errorMessage.setAttribute("aria-live", "polite");
    }

    const eventName =
      field === consent || field === level ? "change" : "input";

    field.addEventListener(eventName, () => {
      validateField(field);

      // Check confirmation again when the password changes.
      if (field === password && confirmPassword.value !== "") {
        validateField(confirmPassword);
      }
    });

    field.addEventListener("blur", () => {
      validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate every field, including untouched ones.
    const results = fields.map((field) => validateField(field));
    const formIsValid = results.every((result) => result);

    if (!formIsValid) {
      const firstInvalid = fields.find(
        (field) => field.getAttribute("aria-invalid") === "true"
      );

      firstInvalid.focus();
      return;
    }

    const dossierNumber =
      `NA-${new Date().getFullYear()}-${crypto.randomUUID()}`;

    const title = document.createElement("p");
    title.textContent =
      "Formulaire validé ! Voici votre récapitulatif :";

    const list = document.createElement("ul");
    list.className = "confirmation-list";

    const details = [
      ["Parent", parent.value.trim()],
      ["Élève", child.value.trim()],
      ["Email", email.value.trim()],
      ["Téléphone", phone.value.trim()],
      ["Niveau", level.selectedOptions[0].textContent],
      ["Numéro de dossier", dossierNumber],
    ];

    details.forEach(([label, value]) => {
      const item = document.createElement("li");
      const strong = document.createElement("strong");

      strong.textContent = value;
      item.append(`${label} : `, strong);
      list.append(item);
    });

    // textContent safely displays values entered by the user.
    success.replaceChildren(title, list);

    form.hidden = true;
    form.style.display = "none";

    success.hidden = false;
    success.style.display = "block";
    success.setAttribute("tabindex", "-1");
    success.focus();
  });
}


}