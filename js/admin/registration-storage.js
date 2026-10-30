export default class RegistrationStorage {
  constructor() {
    const savedData = localStorage.getItem("nour-academy-admin");
    this.data = savedData ? JSON.parse(savedData) : [];
  }

  getAll() {
    return this.data;
  }

  add(dossier) {
    this.data.push(dossier);
    this.save();
  }

  save() {
    localStorage.setItem(
      "nour-academy-admin",
      JSON.stringify(this.data)
    );
  }

  remove(id) {
    this.data = this.data.filter(
      (item) => item.dossier !== id
    );

    this.save();
  }

  update(dossier) {
      for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].dossier === dossier.dossier) {
            this.save();
            this.data[i] = dossier;
            return;
          }
  }
}

}

