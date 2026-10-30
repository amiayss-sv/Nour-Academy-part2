export default class Router {
  constructor(root, routes) {
    this.root = root;
    this.routes = routes;
  }

  start() {
    window.addEventListener("hashchange", () => {
      if (window.location.hash.startsWith("#/")) {
        console.log(window.location.hash + "gggggg");
        this.render();
      }
    })


    if (!window.location.hash.startsWith("#/")) {
      window.location.hash = "#/admin";
    } else {
      this.render();
    }
  }

  async render() {
    const path = window.location.hash.slice(1);
    const renderPage =
    this.routes[path] || this.routes["/404"];
    const page = await renderPage();

    this.root.replaceChildren(page);
  }
}