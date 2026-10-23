import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import Catalogue from "./components/catalogue.js";
import Selection from "./components/selection.js";
import RegistrationForm from "./components/form.js";

const app = document.getElementById("app");
const navbar = new Navbar();
const main = document.createElement("main");
const hero = new Hero();
const selection = new Selection();
const catalogue =  new Catalogue();
const form = new RegistrationForm();
const footer = new Footer();
const fetchCours =await catalogue.render();

main.append(hero.render(),fetchCours , selection.render(), form.render());
app.append(navbar.render(),main, footer.render());