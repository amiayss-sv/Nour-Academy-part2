import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import Catalogue from "./components/catalogue.js";
import Selection from "./components/selection.js";
import RegistrationForm from "./components/form.js";

import Admin from "./components/admin.js";

import Store from "./store.js";

import Router from "./router.js";
import RegistrationStorage from "./admin/registration-storage.js";

const app = document.getElementById("app");

const store = new Store();
const storage = new RegistrationStorage();

const navbar = new Navbar();
const hero = new Hero();
const catalogue = new Catalogue(store);
const selection = new Selection(store, catalogue);


const form = new RegistrationForm(store, storage);

const footer = new Footer();

form.selection = selection;
form.catalogue = catalogue;
catalogue.selection = selection;

const admin = new Admin(storage);


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

/// admin>>>>>>>>>>>>>>>
function renderInscriptions() {
  return admin.render("inscriptions");
}

function renderDashboard() {
  return admin.render("dashboard");
}

 /// page erreur >>>>>>>>>>>>>>>>>>
function renderNotFound() {
  const page = document.createElement("main");
  const title = document.createElement("h1");

  title.textContent = "Page Not found 404";

  page.append(title);

  return page;
}

//// concept SPA >>>>>>>>>>>>>>>>
const routes = {
  "/": renderHome,
  "/accueil": renderHome,
  "/catalogue": renderCatalogue,
  "/selection": renderSelection,
  "/inscription": renderInscription,
  "/admin": renderInscriptions,
  "/inscriptions": renderInscriptions,
  "/tableau-de-bord": renderDashboard,
  "/404": renderNotFound
};




//////////  <> Start Aplication spa <> \\\\\\\\\\\

const router = new Router(app, routes);
router.start();