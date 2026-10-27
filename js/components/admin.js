
export default class Admin {
    constructor() {
    this.element = document.createElement("selection");
    this.element.className = "site-admin";
  }

  
  render() {
    this.element.innerHTML = `
        <div class="sidbar">
    <div class="profile">khadija</div>
    <div class="listes">

        <table border="1">
          <tr>
            <th>parent</th>
            <th>childe</th>
            <th>courses</th>
            <th>date</th>
          </tr>
          <tr>
            <td>mohmaed</td>
            <td>ali</td>
            <td>2026/07-22</td>
          </tr>
            <tr>
            <td>mohmaed</td>
            <td>ali</td>
            <td>2026/07-22</td>
          </tr>
            <tr>
            <td>mohmaed</td>
            <td>ali</td>
            <td>2026/07-22</td>
          </tr>
         

        </table>
    </div>
  </div>
           
    `;

    return this.element;
  }
}

