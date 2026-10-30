
import Store from "../store.js";

export default class RegistrationForm {
  constructor(store = new Store(), registrationStorage) {
    this.element = document.createElement("section");
    this.element.className = "section bg-cream-2";
    this.element.id = "inscription";

    this.store = store;
    this.registrationStorage = registrationStorage;
    this.editingDossier = null;
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
                Vérifiez les informations avant de valider le dossier.
              </p>

              <div class="space-top-large">
                <div class="enroll-perk">
                  Validation des informations
                </div>

                <div class="enroll-perk">
                  Vérification des champs obligatoires
                </div>

                <div class="enroll-perk">
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
                  Tous les champs obligatoires doivent être remplis.
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
                    <label class="field-label" for="rf-center">
                      Centre
                    </label>

                    <select
                      class="field-select"
                      id="rf-center"
                      name="center"
                      required
                    >
                      <option value="">Choisir un centre</option>
                      <option value="Nador Centre">Nador Centre</option>
                      <option value="Hay Al Matar">Hay Al Matar</option>
                      <option value="Selouane">Selouane</option>
                    </select>

                    <span class="field-error">
                      Veuillez choisir un centre.
                    </span>
                    <span class="field-success">
                      Centre sélectionné.
                    </span>
                  </div>

                  <div
                    class="width-half-small"
                    id="status-field"
                    style="display:none;"
                  >
                    <label class="field-label" for="rf-status">
                      Statut de l'inscription
                    </label>

                    <select class="field-select" id="rf-status">
                      <option value="En attente">En attente</option>
                      <option value="Validée">Validée</option>
                      <option value="Payée">Payée</option>
                      <option value="Refusée">Refusée</option>
                    </select>
                  </div>

                  <div class="width-full" id="consent-field">
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
                      Le consentement est obligatoire.
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
                      id="submit-registration"
                      type="submit"
                    >
                      Valider mon inscription
                    </button>

                    <p class="form-note center-text space-top-small no-bottom-space">
                      Vérifiez vos informations avant de continuer.
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
    this.fillEditForm();

    return this.element;
  }

  handllerForm() {
    const form = this.element.querySelector("#registration-form");

    const parent = form.querySelector("#rf-parent");
    const email = form.querySelector("#rf-email");
    const phone = form.querySelector("#rf-phone");
    const child = form.querySelector("#rf-child");
    const center = form.querySelector("#rf-center");
    const consent = form.querySelector("#rf-consent");
    const selectionError = form.querySelector("#selection-error");

    const fields = [
      parent,
      email,
      phone,
      child,
      center,
      consent
    ];

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

      field.setAttribute(
        "aria-describedby",
        `${error.id} ${success.id}`
      );
    });

    const validateParent = () => {
      const value = parent.value.trim();
      const valid = this.CheckOnlyCharacter(value);

      this.showValidation(
        parent,
        valid,
        value === ""
          ? "Veuillez saisir votre nom."
          : "Saisissez un nom valide."
      );

      return valid;
    };

    const validateEmail = () => {
      const valid = this.emailIsValid(email.value);

      this.showValidation(
        email,
        valid,
        "Veuillez saisir un email valide."
      );

      return valid;
    };

    const validatePhone = () => {
      const valid = this.phoneIsValid(phone.value);

      this.showValidation(
        phone,
        valid,
        "Veuillez saisir un numéro de téléphone valide."
      );

      return valid;
    };

    const validateChild = () => {
      const value = child.value.trim();
      const valid = this.CheckOnlyCharacter(value);

      this.showValidation(
        child,
        valid,
        value === ""
          ? "Veuillez saisir le prénom de l'élève."
          : "Saisissez un prénom valide."
      );

      return valid;
    };

    const validateCenter = () => {
      const valid = center.value !== "";

      this.showValidation(
        center,
        valid,
        "Veuillez choisir un centre."
      );

      return valid;
    };

    const validateConsent = () => {
      const valid = consent.checked;

      this.showValidation(
        consent,
        valid,
        "Le consentement est obligatoire."
      );

      return valid;
    };

    parent.addEventListener("input", validateParent);
    email.addEventListener("input", validateEmail);
    phone.addEventListener("input", validatePhone);
    child.addEventListener("input", validateChild);
    center.addEventListener("change", validateCenter);
    consent.addEventListener("change", validateConsent);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const results = [
        validateParent(),
        validateEmail(),
        validatePhone(),
        validateChild(),
        validateCenter()
      ];

      if (!this.editingDossier) {
        results.push(validateConsent());
      }

      if (results.includes(false)) {
        const firstInvalid = fields.find(
          (field) => field.getAttribute("aria-invalid") === "true"
        );

        if (firstInvalid) {
          firstInvalid.focus();
        }

        return;
      }

      if (this.editingDossier) {
        this.updateRegistration();
        return;
      }

      const courses = this.store.getCours();

      if (courses.length === 0) {
        selectionError.style.display = "block";
        return;
      }

      selectionError.style.display = "none";
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

  prepareEdit(dossier) {
    this.editingDossier = dossier;
  }

  fillEditForm() {
    if (!this.editingDossier) return;

    const form = this.element.querySelector("#registration-form");
    const dossier = this.editingDossier;

    const parent = form.querySelector("#rf-parent");
    const email = form.querySelector("#rf-email");
    const phone = form.querySelector("#rf-phone");
    const childInput = form.querySelector("#rf-child");
    const centerInput = form.querySelector("#rf-center");
    const statusField = form.querySelector("#status-field");
    const status = form.querySelector("#rf-status");
    const consentField = form.querySelector("#consent-field");
    const submitButton = form.querySelector("#submit-registration");

    parent.value = dossier.parent || "";
    email.value = dossier.email || "";
    phone.value = dossier.telephone || "";

    const children = Array.isArray(dossier.childs)
      ? dossier.childs
      : [];

    if (children.length > 0) {
      const enfant = children[0];

      childInput.value = enfant.name || "";
      status.value = enfant.status || "En attente";

      if (enfant.centre && enfant.centre !== "—") {
        centerInput.value = enfant.centre;
      } else if (dossier.center && dossier.center !== "—") {
        centerInput.value = dossier.center;
      } else {
        centerInput.value = "";
      }
    } else {
      centerInput.value =
        dossier.center && dossier.center !== "—"
          ? dossier.center
          : "";
    }

    statusField.style.display = "block";
    consentField.style.display = "none";

    submitButton.textContent = "Enregistrer les modifications";
  }

  confirmRegistration() {
    const form = this.element.querySelector("#registration-form");
    const success = this.element.querySelector("#registration-success");

    const parentName = form.querySelector("#rf-parent").value.trim();
    const email = form.querySelector("#rf-email").value.trim();
    const phone = form.querySelector("#rf-phone").value.trim();
    const childName = form.querySelector("#rf-child").value.trim();
    const center = form.querySelector("#rf-center").value;

    const courses = this.store.getCours();

    let total = 0;
    const courseNames = [];

    for (let i = 0; i < courses.length; i++) {
      total += Number(courses[i].price || 0);
      courseNames.push(courses[i].title);
    }

    const firstCourse = courses[0];

    const niveau = firstCourse
      ? firstCourse.levelLabel || firstCourse.level || "—"
      : "—";

    const registrations = this.registrationStorage.getAll();

    const number =
      `NA-${new Date().getFullYear()}-${String(
        registrations.length + 1
      ).padStart(3, "0")}`;

    const dossier = {
      id: registrations.length + 1,
      dossier: number,
      parent: parentName,
      telephone: phone,
      email: email,
      childs: [
        {
          id: Date.now(),
          name: childName,
          niveau: niveau,
          courses: courseNames,
          status: "En attente",
          date: new Date().toISOString().slice(0, 10),
          prix: total,
          centre: center
        }
      ],
      center: center,
      montant: total
    };

    this.registrationStorage.add(dossier);

    success.innerHTML = `
      <p>Inscription enregistrée avec succès !</p>

      <ul class="confirmation-list">
        <li>Parent : <strong id="summary-parent"></strong></li>
        <li>Élève : <strong id="summary-child"></strong></li>
        <li>Cours : <strong id="summary-courses"></strong></li>
        <li>Centre : <strong id="summary-center"></strong></li>
        <li>Total mensuel : <strong id="summary-total"></strong></li>
        <li>Numéro de dossier : <strong id="summary-number"></strong></li>
      </ul>
    `;

    success.querySelector("#summary-parent").textContent = parentName;
    success.querySelector("#summary-child").textContent = childName;
    success.querySelector("#summary-courses").textContent =
      courseNames.join(", ");
    success.querySelector("#summary-center").textContent = center;
    success.querySelector("#summary-total").textContent = `${total} MAD`;
    success.querySelector("#summary-number").textContent = number;

    for (let i = 0; i < courses.length; i++) {
      this.store.removeCours(courses[i].id);
      this.store.setSeats(courses[i].id, 1);
    }

    this.selection.renderMycours();
    this.catalogue.filterCourses();

    form.reset();
    this.clearValidation(form);

    this.editingDossier = null;

    form.style.display = "none";
    success.style.display = "block";
    success.focus();
  }

  updateRegistration() {
    const form = this.element.querySelector("#registration-form");
    const dossier = this.editingDossier;

    const center = form.querySelector("#rf-center").value;

    dossier.parent = form.querySelector("#rf-parent").value.trim();
    dossier.email = form.querySelector("#rf-email").value.trim();
    dossier.telephone = form.querySelector("#rf-phone").value.trim();
    dossier.center = center;

    const children = Array.isArray(dossier.childs)
      ? dossier.childs
      : [];

    if (children.length > 0) {
      children[0].name = form.querySelector("#rf-child").value.trim();
      children[0].status = form.querySelector("#rf-status").value;
      children[0].centre = center;
    }

    this.registrationStorage.update(dossier);

    this.editingDossier = null;

    const success = this.element.querySelector("#registration-success");

    const message = document.createElement("p");
    message.textContent = "Dossier modifié avec succès !";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-coral";
    button.textContent = "Retour aux inscriptions";

    button.addEventListener("click", () => {
      window.location.hash = "#/inscriptions";
    });

    success.replaceChildren(message, button);

    form.style.display = "none";
    success.style.display = "block";
    success.focus();
  }

  clearValidation(form) {
    form.querySelectorAll("input, select").forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    });

    form.querySelectorAll(".field-error, .field-success").forEach((message) => {
      message.style.display = "none";
    });
  }
}
