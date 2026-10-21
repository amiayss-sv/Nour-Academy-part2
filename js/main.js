import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";

const app = document.getElementById("app");

const navbar = new Navbar();
const footer = new Footer();

app.append(navbar.render(), footer.render());