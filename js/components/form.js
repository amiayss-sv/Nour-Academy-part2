import Store from "../store.js";

export default class RegistrationForm {
  constructor(store = new Store()) {
    this.element = document.createElement("section");
    this.element.className = "section bg-cream-2";
    this.element.id = "inscription";
    this.store = store;
  }

  render() {
    this.element.innerHTML = `
      <div class="page-container">
        <div class="enroll-band reveal">
          <div class="layout-row spacing-large items-center">

            <div class="width-five-large">
              <span
                class="eyebrow"
                style="background:rgba(255,255,255,.2);color:#fff;"
              >
                Dernière étape
              </span>

              <h2>Complétez le dossier d'inscription</h2>

              <p class="intro-text">
                Chaque champ est vérifié au fur et à mesure de la saisie
                pour éviter les dossiers incomplets ou erronés.
              </p>

              <div class="space-top-large">
                <div class="enroll-perk">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      stroke-width="2.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Validation en temps réel des champs
                </div>

                <div class="enroll-perk">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      stroke-width="2.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Validation bloquée tant que le dossier est incomplet
                </div>

                <div class="enroll-perk">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      stroke-width="2.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Récapitulatif après validation
                </div>
              </div>
            </div>

            <div class="width-seven-large">
              <form
                class="registration-form"
                id="registration-form"
                novalidate
              >
                <h3>Formulaire d'inscription</h3>

                <p class="form-note space-bottom-medium">
                  Tous les champs sont obligatoires.
                </p>

                <div class="layout-row spacing-small">

                  <div class="width-half-small">
                    <label class="field-label" for="rf-parent">
                      Nom du parent
                    </label>

                    <input
                      class="field-input"
                      id="rf-parent"
                      name="parent"
                      type="text"
                      required
                      autocomplete="name"
                      placeholder="Nom et prénom"
                    >

                    <span class="field-error">
                      Veuillez saisir un nom valide.
                    </span>
                    <span class="field-success">Nom valide.</span>
                  </div>

                  <div class="width-half-small">
                    <label class="field-label" for="rf-email">
                      Email
                    </label>

                    <input
                      class="field-input"
                      id="rf-email"
                      name="email"
                      type="email"
                      required
                      autocomplete="email"
                      placeholder="vous@email.com"
                    >

                    <span class="field-error">
                      Veuillez saisir un email valide.
                    </span>
                    <span class="field-success">Email valide.</span>
                  </div>

                  <div class="width-half-small">
                    <label class="field-label" for="rf-phone">
                      Téléphone
                    </label>

                    <input
                      class="field-input"
                      id="rf-phone"
                      name="phone"
                      type="tel"
                      required
                      autocomplete="tel"
                      placeholder="06 12 34 56 78"
                    >

                    <span class="field-error">
                      Format attendu : 06/07 + 8 chiffres,
                      ou +212 6/7 + 8 chiffres.
                    </span>
                    <span class="field-success">Numéro valide.</span>
                  </div>

                  <div class="width-half-small">
                    <label class="field-label" for="rf-child">
                      Prénom de l'élève
                    </label>

                    <input
                      class="field-input"
                      id="rf-child"
                      name="child"
                      type="text"
                      required
                      placeholder="Prénom de l'enfant"
                    >

                    <span class="field-error">
                      Veuillez saisir un prénom valide.
                    </span>
                    <span class="field-success">Prénom valide.</span>
                  </div>

                  <div class="width-half-small">
                    <label class="field-label" for="rf-level">
                      Niveau de l'élève
                    </label>

                    <select
                      class="field-select"
                      id="rf-level"
                      name="level"
                      required
                    >
                      <option value="">Choisir un niveau…</option>
                      <option value="primaire">Primaire</option>
                      <option value="college">Collège</option>
                      <option value="tronc-commun">Tronc commun</option>
                      <option value="1bac">1ère Bac</option>
                      <option value="2bac">2ème Bac</option>
                    </select>

                    <span class="field-error">
                      Veuillez choisir un niveau.
                    </span>
                    <span class="field-success">Niveau choisi.</span>
                  </div>

                  <div class="width-half-small"></div>

                  <div class="width-half-small">
                    <label class="field-label" for="rf-password">
                      Mot de passe
                    </label>

                    <input
                      class="field-input"
                      id="rf-password"
                      name="password"
                      type="password"
                      required
                      autocomplete="new-password"
                      placeholder="8 caractères minimum"
                    >

                    <span class="field-error">
                      8 caractères minimum, avec une majuscule,
                      un chiffre et un caractère spécial.
                    </span>
                    <span class="field-success">
                      Mot de passe valide.
                    </span>
                  </div>

                  <div class="width-half-small">
                    <label class="field-label" for="rf-password-confirm">
                      Confirmer le mot de passe
                    </label>

                    <input
                      class="field-input"
                      id="rf-password-confirm"
                      name="passwordConfirm"
                      type="password"
                      required
                      autocomplete="new-password"
                      placeholder="Retapez le mot de passe"
                    >

                    <span class="field-error">
                      Les mots de passe ne correspondent pas.
                    </span>
                    <span class="field-success">
                      Les mots de passe correspondent.
                    </span>
                  </div>

                  <div class="width-full">
                    <div class="form-check-row">
                      <input
                        type="checkbox"
                        id="rf-consent"
                        name="consent"
                        required
                      >

                      <label for="rf-consent">
                        J'accepte que mes données soient utilisées
                        uniquement pour traiter cette inscription,
                        conformément à la loi 09-08 relative à la
                        protection des données à caractère personnel (CNDP).
                      </label>
                    </div>

                    <span class="field-error">
                      Le consentement est obligatoire pour valider le dossier.
                    </span>
                    <span class="field-success">
                      Consentement accepté.
                    </span>
                  </div>

                  <div class="width-full">
                    <p
                      class="field-error"
                      id="selection-error"
                      role="alert"
                      style="display:none;"
                    >
                      Veuillez sélectionner au moins un cours.
                    </p>

                    <button
                      class="button button-coral button-large full-width"
                      type="submit"
                    >
                      Valider mon inscription
                    </button>

                    <p
                      class="form-note center-text space-top-small no-bottom-space"
                    >
                      La validation est bloquée si un champ est invalide,
                      si la sélection est vide ou si le consentement
                      n'est pas coché.
                    </p>
                  </div>

                </div>
              </form>

              <div
                class="form-success"
                id="registration-success"
                role="status"
                tabindex="-1"
                style="display:none;"
              ></div>
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

    const parent = form.querySelector("#rf-parent");
    const email = form.querySelector("#rf-email");
    const phone = form.querySelector("#rf-phone");
    const child = form.querySelector("#rf-child");
    const level = form.querySelector("#rf-level");
    const password = form.querySelector("#rf-password");
    const confirmation = form.querySelector("#rf-password-confirm");
    const consent = form.querySelector("#rf-consent");

    const selectionError = form.querySelector("#selection-error");

    const fields = [
      parent,
      email,
      phone,
      child,
      level,
      password,
      confirmation,
      consent,
    ];

    // préparer les messages et les associations accessibles.

    fields.forEach((field) => {
      const container = field.closest(
        ".width-half-small, .width-full"
      );

      const error = container.querySelector(".field-error");
      const success = container.querySelector(".field-success");

      error.style.display = "none";
      success.style.display = "none";

      error.id = `${field.id}-error`;
      success.id = `${field.id}-success`;

      error.setAttribute("aria-live", "polite");
      success.setAttribute("aria-live", "polite");

      field.setAttribute(
        "aria-describedby",
        `${error.id} ${success.id}`
      );
    });

    // Nom du parent.
    const validateParent = () => {
      const name = parent.value.trim();
      const isValid = this.CheckOnlyCharacter(name);

      this.showValidation(
        parent,
        isValid,
        name === ""
          ? "Veuillez saisir votre nom."
          : "Saisissez au moins 2 caractères, avec des lettres et des séparateurs valides."
      );

      return isValid;
    };

    parent.addEventListener("input", validateParent);

    // email ======> 
    const validateEmail = () => {
      const isValid = this.emailIsValid(email.value);

      this.showValidation(
        email,
        isValid,
        email.value.trim() === ""
          ? "Veuillez saisir votre email."
          : "Veuillez saisir un email valide, comme vous@email.com."
      );

      return isValid;
    };

    email.addEventListener("input", validateEmail);

    //elephone.
    const validatePhone = () => {
      const isValid = this.phoneIsValid(phone.value);

      this.showValidation(
        phone,
        isValid,
        phone.value.trim() === ""
          ? "Veuillez saisir votre numéro de téléphone."
          : "Format attendu : 06/07 + 8 chiffres, ou +212 6/7 + 8 chiffres."
      );

      return isValid;
    };

    phone.addEventListener("input", validatePhone);

    // prenom de l'eleve
    const validateChild = () => {
      const name = child.value.trim();
      const isValid = this.CheckOnlyCharacter(name);

      this.showValidation(
        child,
        isValid,
        name === ""
          ? "Veuillez saisir le prénom de l'élève."
          : "Saisissez au moins 2 caractères, avec des lettres et des séparateurs valides."
      );

      return isValid;
    };

    child.addEventListener("input", validateChild);

    // Niveau  l'eleve
    const validateLevel = () => {
      const isValid = level.value !== "";

      this.showValidation(
        level,
        isValid,
        "Veuillez choisir un niveau."
      );

      return isValid;
    };

    level.addEventListener("change", validateLevel);

    /////// confirmation du mot de passe 

    const validateConfirmation = () => {
      const isValid =
        confirmation.value !== "" &&
        confirmation.value === password.value;

      this.showValidation(
        confirmation,
        isValid,
        confirmation.value === ""
          ? "Veuillez confirmer votre mot de passe."
          : "Les mots de passe ne correspondent pas."
      );

      return isValid;
    };

    confirmation.addEventListener("input", validateConfirmation);

    // mot de passe
    const validatePassword = () => {
      const isValid = this.passwordIsValid(password.value);

      this.showValidation(
        password,
        isValid,
        password.value === ""
          ? "Veuillez saisir un mot de passe."
          : "8 caractères minimum, avec une majuscule, un chiffre et un caractère spécial."
      );

      return isValid;
    };

    password.addEventListener("input", () => {
      validatePassword();

      // revérifier la confirmation après modification du mot de passe
      if (confirmation.value !== "") {
        validateConfirmation();
      }
    });

    // consentement
    const validateConsent = () => {
      const isValid = consent.checked;

      this.showValidation(
        consent,
        isValid,
        "Le consentement est obligatoire pour valider le dossier."
      );

      return isValid;
    };

    consent.addEventListener("change", validateConsent);

    // Validation de tous les champs avant de continuer.
    form.addEventListener("submit", (event) => {
      
      event.preventDefault();
      
      const results = [
        validateParent(),
        validateEmail(),
        validatePhone(),
        validateChild(),
        validateLevel(),
        validatePassword(),
        validateConfirmation(),
        validateConsent(),
      ];

      const courses = this.store.getCours();
      const selectionIsEmpty = courses.length === 0;

      selectionError.style.display =
        selectionIsEmpty ? "block" : "none";

      if (results.includes(false)) {
        const firstInvalid = fields.find(
          (field) => field.getAttribute("aria-invalid") === "true"
        );

        firstInvalid.focus();
        return;
      }

      if (selectionIsEmpty) {
        const catalogueButton = document.querySelector(
          "#catalogue .course-add:not(:disabled)"
        );

        if (catalogueButton) {
          catalogueButton.focus();
        }

        return;
      }

      this.showSummary(form, child, level, courses);
      // afifchage
      this.confirmRegistration();
    });
  }


  showValidation(field, isValid, message) {
    const container = field.closest(
      ".width-half-small, .width-full"
    );

    const error = container.querySelector(".field-error");
    const success = container.querySelector(".field-success");

    error.textContent = message;
    error.style.display = isValid ? "none" : "block";
    success.style.display = isValid ? "block" : "none";

    field.classList.toggle("is-valid", isValid);
    field.classList.toggle("is-invalid", !isValid);

    field.setAttribute("aria-invalid", String(!isValid));
  }

  CheckOnlyCharacter(name) {
    return (
      name.length >= 2 &&
      /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u.test(name)
    );
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  phoneIsValid(phone) {
    const number = phone.trim().split(" ").join("");

    return /^(0|\+212)[67][0-9]{8}$/.test(number);
  }

  passwordIsValid(password) {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^\p{L}\p{N}\s]).{8,}$/u.test(
      password
    );
  }


  showSummary(form, child, level, courses) {
    const success = this.element.querySelector("#registration-success");

    const title = document.createElement("p");
    title.textContent =
      "Formulaire validé. Voici votre récapitulatif :";

    const note = document.createElement("p");
    note.className = "form-note";
    note.textContent =
      "Cette démonstration ne transmet pas les données à un serveur.";

    const list = document.createElement("ul");
    list.className = "confirmation-list";

    const total = courses.reduce(
      (sum, course) => sum + Number(course.price),
      0
    );

    const details = [
      ["Élève", child.value.trim()],
      ["Niveau", level.selectedOptions[0].textContent],
      [
        "Cours sélectionnés",
        courses.map((course) => course.title).join(", "),
      ],
      ["Total mensuel", `${total} MAD`],
    ];

    details.forEach(([label, value]) => {
      const item = document.createElement("li");
      const strong = document.createElement("strong");

      strong.textContent = value;
      item.append(`${label} : `, strong);

      list.append(item);
    });
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "button button-coral";
    editButton.textContent = "Modifier mes informations";

    editButton.addEventListener("click", () => {
      success.style.display = "none";
      form.style.display = "";
      child.focus();
    });

  
    success.replaceChildren(title, list, note, editButton);
    form.style.display = "none";
    success.style.display = "block";
    success.focus();
  }


  confirmRegistration() {

  const form = this.element.querySelector("#registration-form");
  const success = this.element.querySelector("#registration-success");

  const child = form.querySelector("#rf-child").value.trim();

  const courses = [...this.store.getCours()];

  const total = courses.reduce(

    (sum, course) => sum + Number(course.price),
    0
  );


  const number = "NA-" + crypto.randomUUID();


  success.innerHTML = `

    <p>Inscription validée ! Voici votre récapitulatif :</p>
    <ul class="confirmation-list">
      <li>Élève : <strong id="summary-child"></strong></li>
      <li>Cours : <strong id="summary-courses"></strong></li>
      <li>Total mensuel : <strong id="summary-total"></strong></li>
      <li>Numéro de dossier : <strong id="summary-number"></strong></li>
    </ul>
  `;


  success.querySelector("#summary-child").textContent = child;

  success.querySelector("#summary-courses").textContent =
    courses.map((course) => course.title).join(", ");

  success.querySelector("#summary-total").textContent =
    `${total} MAD`;

  success.querySelector("#summary-number").textContent = number;

  courses.forEach((course) => {
    this.store.removeCours(course.id);
    this.store.setSeats(course.id, 1);


    const item = this.catalogue.courses.find(
      (item) => String(item.id) === String(course.id)
    );

    if (item) item.seats = 1;
  });

  this.selection.renderMycours();
  this.catalogue.filterCourses();

  form.reset();

  form.querySelectorAll("input, select").forEach((field) => {
    field.classList.remove("is-valid", "is-invalid");
    field.removeAttribute("aria-invalid");
  });

  form.querySelectorAll(".field-error, .field-success").forEach(
    (message) => {
      message.style.display = "none";
    }
  );

  success.style.display = "block";
  success.setAttribute("tabindex", "-1");
  success.focus();
}
}