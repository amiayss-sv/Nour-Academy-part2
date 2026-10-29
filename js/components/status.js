export default class Status {
    constructor() {
        this.element = document.createElement("select");
        this.element.className = "field-status";
        
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