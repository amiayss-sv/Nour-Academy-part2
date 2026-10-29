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
}

