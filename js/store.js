export default class Store {
  constructor() {
    this.seats =  JSON.parse(
      localStorage.getItem("seats") || "{}");
      this.selectedCourses = JSON.parse(
      localStorage.getItem("courses") || "[]");
  }

  setSeats(id, count) {
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

  removeCours(id) {
    this.selectedCourses = this.selectedCourses.filter(
      (course) => String(course.id) !== String(id)
    );
    
    localStorage.setItem(
      "courses",
      this.convertString(this.selectedCourses)
    );
      // add cours wheeen remove it in selection 
    this.setSeats(id, 1);
  }
}
