
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import Catalogue from "./components/catalogue.js";
import Selection from "./components/selection.js";
import RegistrationForm from "./components/form.js";
import Admin from "./components/admin.js";

import Store from "./store.js";
import RegistrationStorage from "./admin/registration-storage.js";

const store = new Store();
const storage = new RegistrationStorage();

const navbar = new Navbar();
const footer = new Footer();
const hero = new Hero();

const catalogue = new Catalogue(store);
const selection = new Selection(store, catalogue);
const form = new RegistrationForm(store, storage);

const admin = new Admin(storage, form);

form.selection = selection;
form.catalogue = catalogue;
catalogue.selection = selection;

async function renderHome() {
  const page = document.createElement("div");
  const main = document.createElement("main");

  const courses = await catalogue.render();

  main.append(
    hero.render(),
    courses,
    selection.render(),
    form.render()
  );

  page.append(
    navbar.render(),
    main,
    footer.render()
  );

  return page;
}


async function renderCatalogue() {
  const page = document.createElement("div");
  const main = document.createElement("main");

  const courses = await catalogue.render();

  main.append(courses);

  page.append(
    navbar.render(),
    main,
    footer.render()
  );

  return page;
}

function renderSelection() {
  const page = document.createElement("div");
  const main = document.createElement("main");

  main.append(selection.render());

  page.append(
    navbar.render(),
    main,
    footer.render()
  );

  return page;
}

function renderInscription() {
  const page = document.createElement("div");
  const main = document.createElement("main");

  main.append(form.render());

  page.append(
    navbar.render(),
    main,
    footer.render()
  );

  return page;
}


function renderInscriptions() {
  return admin.render("inscriptions");
}

function renderDashboard() {
  return admin.render("dashboard");
}



function renderNotFound() {
  const page = document.createElement("main");
  const title = document.createElement("h1");

  title.textContent = "Page Not Found 404";

  page.append(title);

  return page;
}

///// just testing ....
function renderYoucode() {
  const page = document.createElement("main");
  const title = document.createElement("h1");

  title.textContent = " You code ..";
  title.style.color = "green";

  page.append(title);

  return page;
}
const routes = {
  "/": renderInscriptions,
  "/accueil": renderHome,
  "/catalogue": renderCatalogue,
  "/selection": renderSelection,
  "/inscription": renderInscription,

  "/admin": renderInscriptions,
  "/inscriptions": renderInscriptions,
  "/tableau-de-bord": renderDashboard,

  "/404": renderNotFound,
  "/youcode": renderYoucode
};


export default routes;
