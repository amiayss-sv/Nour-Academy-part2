export default class Store {
  constructor() {
    this.seats =  JSON.parse(
      localStorage.getItem("seats") || "{}");
      this.selectedCourses = JSON.parse(
      localStorage.getItem("courses") || "[]");
  }


  setSeats(id, count) {
    console.log(this.seats);
    
    this.seats[id] = count;
    localStorage.setItem(
      "seats",
      JSON.stringify(this.seats)
    );
}


getSeats(id, defaultSeats) {
  return this.seats[id] ?? defaultSeats;
}

  convertString(selectedCourses) {
    return JSON.stringify(selectedCourses);
  }

  convertJson(selectedCourses) {
    return JSON.parse(selectedCourses);
  }

  setCours(cours) {
    this.selectedCourses.push(cours);

    localStorage.setItem(
      "courses",
      this.convertString(this.selectedCourses)
    );
  }

  getCours() {
    return this.selectedCourses;
  }

  removeCours(element) {
    this.selectedCourses = this.selectedCourses.filter(
      (e) => e.id !== element.id
    );

    localStorage.setItem(
      "courses",
      this.convertString(this.selectedCourses)
    );
  }
}
