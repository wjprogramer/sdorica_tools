let stableStaticsTableBody;

initStableStaticsPage = async() => {
  const json = await httpGet("/json/monster.json");
  const jsonObject = JSON.parse(json);

  const monsters = jsonObject.monsters;
  
  stableStaticsTableBody = document.querySelector("#stableStaticsTable tbody");

  let tableBody = "";
  monsters.forEach((monster, index) => {
    tableBody += `
      <th>${monster.name}</th>
    `;

    let numberOfStar = Object.entries(monster.numberOfStar);
    numberOfStar.sort((a, b) => {
      a = parseInt(a);
      b = parseInt(b);
      return a - b;
    });
    
    let total = 0;
    numberOfStar.forEach((item) => {
      total += item[1];
      tableBody += `
        <td>
          <div style="position: relative;">
            <span style="">${item[1]}</span>
            <div class="w3-hide number-control">
              <i class="material-icons w3-text-green">
                add_circle_outline
              </i>
              <i class="material-icons w3-text-red">
                remove_circle_outline
              </i>
            </div>
          </div>
        </td>
      `;
    });
    
    tableBody += `
      <td>
        <div style="display: flex; justify-content: flex-start; flex-direction: row;">
          <span style="flex: 1;">${total}</span>
        </div>
      </td>
    `;

    tableBody = `<tr id=${monster.id}>
      ${tableBody}
    </tr>`;
  });
  stableStaticsTableBody.innerHTML = tableBody;

}