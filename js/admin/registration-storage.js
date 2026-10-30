const DEFAULT_REGISTRATIONS = [

  {
    parent: "Nabil El Amrani",
    child: "Yassine",
    center: "Nador Centre",
    niveau: "2ème Bac",
    courses: ["Maths — Spécialité"],
    status: "Payée",
    prix: 350,
    date: "2026-10-02"
  },
  {
    parent: "Samira Bennis",
    child: "Imane",
    center: "Hay Al Matar",
    niveau: "Collège",
    courses: ["Anglais — Conversation"],
    status: "En attente",
    prix: 280,
    date: "2026-10-03"
  },
  {
    parent: "Karim Azzouzi",
    child: "Adam",
    center: "Selouane",
    niveau: "1ère Bac",
    courses: ["Physique-Chimie"],
    status: "Validée",
    prix: 320,
    date: "2026-10-04"
  },
  {
    parent: "Hind Lahlou",
    child: "Aya",
    center: "Nador Centre",
    niveau: "Primaire",
    courses: ["Maths — Les fondamentaux"],
    status: "Payée",
    prix: 200,
    date: "2026-10-05"
  },
  {
    parent: "Omar Benali",
    child: "Meryem",
    center: "Hay Al Matar",
    niveau: "Tronc commun",
    courses: ["Physique-Chimie — Les bases"],
    status: "Refusée",
    prix: 290,
    date: "2026-10-06"
  },
  {
    parent: "Salma Chraibi",
    child: "Rayan",
    center: "Selouane",
    niveau: "Collège",
    courses: ["Maths — Préparation au lycée"],
    status: "Payée",
    prix: 260,
    date: "2026-10-07"
  },
  {
    parent: "Youssef Idrissi",
    child: "Sara",
    center: "Nador Centre",
    niveau: "2ème Bac",
    courses: ["Maths — Spécialité"],
    status: "En attente",
    prix: 350,
    date: "2026-10-08"
  },
  {
    parent: "Amina El Fassi",
    child: "Hamza",
    center: "Hay Al Matar",
    niveau: "Primaire",
    courses: ["Français — Lecture et écriture"],
    status: "Validée",
    prix: 200,
    date: "2026-10-09"
  },
  {
    parent: "Mehdi Ouahbi",
    child: "Lina",
    center: "Selouane",
    niveau: "1ère Bac",
    courses: ["Français — Préparation au régional"],
    status: "Payée",
    prix: 300,
    date: "2026-10-10"
  },
  {
    parent: "Fatima Zahra Amrani",
    child: "Anas",
    center: "Nador Centre",
    niveau: "2ème Bac",
    courses: ["Physique-Chimie — Préparation au Bac"],
    status: "En attente",
    prix: 350,
    date: "2026-10-11"
  },
  {
    parent: "Rachid Tazi",
    child: "Nour",
    center: "Hay Al Matar",
    niveau: "Collège",
    courses: ["Anglais — Conversation"],
    status: "Payée",
    prix: 280,
    date: "2026-10-12"
  },
  {
    parent: "Khadija Mansouri",
    child: "Ilyas",
    center: "Selouane",
    niveau: "2ème Bac",
    courses: ["Maths — Spécialité"],
    status: "Validée",
    prix: 350,
    date: "2026-10-13"
  }
];

const dossiers = DEFAULT_REGISTRATIONS.map((item, index) => ({
  id: index + 1,
  dossier: `NA-2026-${String(index + 1).padStart(3, "0")}`,
  parent: item.parent,
  telephone: `06123456${String(index + 1).padStart(2, "0")}`,
  email: `parent${index + 1}@example.com`,
  center: item.center,
  montant: item.prix,

  childs: [
    {
      id: 1001 + index,
      name: item.child,
      niveau: item.niveau,
      courses: item.courses,
      status: item.status,
      paymentStatus: item.status === "Payée" ? "Payée" : "Non payée",
      date: item.date,
      prix: item.prix,
      centre: item.center
    }
  ]
}));



export default class RegistrationStorage {
  constructor() {
    const savedData = localStorage.getItem("nour-academy-admin");
    if(savedData ===null) {
      this.data = dossiers;
      this.save();
    } else {
      this.data = JSON.parse(savedData);
    }
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

