export default class Action {
    constructor() {
        this.element = document.createElement("div");
        this.element.className = "action-menu";
    }

    render() {
        this.element.innerHTML = `
            <button type="button" class="btn-modifier">
                Modifier
            </button>

            <button type="button" class="btn-supprimer">
                Supprimer
            </button>
        `;

        return this.element;
    }
}