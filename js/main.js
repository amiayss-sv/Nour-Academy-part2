import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import Catalogue from "./components/catalogue.js";
import Selection from "./components/selection.js";
const app = document.getElementById("app");

const navbar = new Navbar();
const main = document.createElement("main");
const hero = new Hero();
const selection = new Selection();
const catalogue = new Catalogue();
const footer = new Footer();

main.append(hero.render(),catalogue.render(), selection.render());

app.append(navbar.render(),main, footer.render());