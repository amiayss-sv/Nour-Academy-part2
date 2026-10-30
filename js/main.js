import Router from "./router.js";
import routes from "./routes.js";

const app = document.getElementById("app");

const router = new Router(app, routes);
router.start();
