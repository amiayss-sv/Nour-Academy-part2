import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import Catalogue from "./components/catalogue.js";
import Selection from "./components/selection.js";
import RegistrationForm from "./components/form.js";
import Store from "./store.js";
import Admin from "./components/admin.js";

const app = document.getElementById("app");
const main = document.createElement("main");
console.log("hhhhhh");
// navigation  endpoint  

let endpopoint = (window.location.href).split("#")[1];
console.log(endpopoint);
console.log("hhhhhh");
const admin = new Admin();
const store  = new Store();

const navbar = new Navbar();
const hero = new Hero();
const catalogue =  new Catalogue(store);
const selection = new Selection(store, catalogue);
const form = new RegistrationForm(store);
const footer = new Footer();

form.selection = selection;
form.catalogue = catalogue;

catalogue.selection = selection;

const fetchCours =await catalogue.render();


switch (endpopoint) {
    case "admin":
            app.append(admin.render());
        break;
    case "selection":
            main.append(selection.render());
            app.append(navbar.render(),main, footer.render());
        break;
    case "catalogue": 
        main.append(fetchCours);
        app.append(navbar.render(),main, footer.render()); 
        break;
    case "inscription":
            main.append(form.render());
            app.append(navbar.render(),main,footer.render());
        break;
        default:    
            main.append(hero.render(),fetchCours , selection.render(), form.render());
            app.append(navbar.render(),main, footer.render());
    
          
            
}        





