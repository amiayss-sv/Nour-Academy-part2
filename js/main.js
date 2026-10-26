import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import Catalogue from "./components/catalogue.js";
import Selection from "./components/selection.js";
import RegistrationForm from "./components/form.js";
import Store from "./store.js";

const store  = new Store();

const app = document.getElementById("app");
const main = document.createElement("main");

const navbar = new Navbar();
const hero = new Hero();
const catalogue =  new Catalogue(store);
const selection = new Selection(store, catalogue);
const form = new RegistrationForm();
const footer = new Footer();


form.selection = selection;
form.catalogue = catalogue;


catalogue.selection = selection;


const fetchCours =await catalogue.render();

main.append(hero.render(),fetchCours , selection.render(), form.render());
app.append(navbar.render(),main, footer.render());