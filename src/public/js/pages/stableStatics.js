let stableStaticsTableBody;
let monsters;
let jsonObject;
let totalByStar = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 0,
  "8": 0,
  "9": 0,
};

initStableStaticsPage = async() => {
  const json = await httpGet("/json/monster.json");
  jsonObject = JSON.parse(json);

  monsters = jsonObject.monsters;
  
  stableStaticsTableBody = document.querySelector("#stableStaticsTable tbody");

  monsters.forEach((monster, index) => {
    let tableBody = "";
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
      const star = item[0];
      const number = item[1];
      total += item[1];
      totalByStar[star] += number;
      tableBody += `
        <td class="star${star}">
          <div style="position: relative;">
            <span class="monsterNumber">${number}</span>
            <div class="noselect w3-hide number-control">
              <a style="cursor: pointer" onclick="setNumberOfStar({ star: ${star}, monsterId: '${monster.id}', diff: 1 })">
                <i class="material-icons w3-text-green">
                  add_circle_outline
                </i>
              </a>
              <a style="cursor: pointer" onclick="setNumberOfStar({ star: ${star}, monsterId: '${monster.id}', diff: -1 })">
                <i class="material-icons w3-text-red">
                  remove_circle_outline
                </i>
              </a>
            </div>
          </div>
        </td>
      `;
    });
    
    tableBody += `
      <td>
        <div style="display: flex; justify-content: flex-start; flex-direction: row;">
          <span class="total" style="flex: 1;">${total}</span>
        </div>
      </td>
    `;

    tableBody = `<tr id="monsterRow${monster.id}">
      ${tableBody}
    </tr>`;

    stableStaticsTableBody.innerHTML += tableBody;
  });

  Object.entries(totalByStar).forEach((e) => {
    const star = e[0];
    const number = e[1];
    updateTotalNumberByStar(star, number);
  });

  updateTotalNumber();
}

setNumberOfStar = ({ star, monsterId, diff }) => {
  const monster = monsters.filter((e) => e.id === monsterId)[0];
  try {
    if (monster) {
      if (monster.numberOfStar[star] <= 0 && diff < 0) {
        return;
      }
      const numberOfStarField = document.querySelector(`#monsterRow${monsterId} .star${star} .monsterNumber`);
      const totalField = document.querySelector(`#monsterRow${monsterId} .total`);
     
      monster.numberOfStar[star] += diff;
      numberOfStarField.innerText = monster.numberOfStar[star];
      totalField.innerHTML = parseInt(totalField.innerText) + diff;

      totalByStar[star] += diff;

      updateTotalNumberByStar(star, totalByStar[star]);
      updateTotalNumber(diff);

      uploadMonster({ star, monsterId, diff });
    } else {
      alert("發生錯誤");
    }
  } catch(error) {
    console.error(error);
    alert("發生錯誤");
  }
}

uploadMonster = async({ star, monsterId, diff }) => {
  try {
    document.getElementById("stableStaticsSaveState").innerText = "同步中";
    const payload = JSON.stringify({ star, monsterId, diff });
    const res = await httpPost("/uploadJson", payload);
    const data = await res.json(); // or `await res.text();`

    if (data.result) {
      document.getElementById("stableStaticsSaveState").innerText = "已是最新";
    } else {
      throw Error();
    }
  } catch(error) {
    document.getElementById("stableStaticsSaveState").innerText = "同步失敗";
    console.log(error)
  }
}

updateTotalNumberByStar = (star, number) => {
  const filed = document.getElementById(`totalByStar${star}`);
  filed.innerText = number;
}

updateTotalNumber = (diff) => {
  const field = document.getElementById("allMonstersTotal");

  let total;
  if (diff) {
    total = parseInt(field.innerText) + diff;
  } else {
    total = 0;
    Object.entries(totalByStar).forEach((e) => {
      const number = e[1];
      total += number;
    });
  }
  
  field.innerText = total;
}