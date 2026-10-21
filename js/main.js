import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";

const app = document.getElementById("app");

const navbar = new Navbar();
const main = document.createElement("main");
const hero = new Hero();
const footer = new Footer();

main.appendChild(hero.render());

app.append(navbar.render(),main, footer.render());