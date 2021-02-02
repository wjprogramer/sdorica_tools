let stableStaticsTableBody;
let totalByStar;

initStableStaticsPage = async() => {

  resetStableStaticsPage();

  stableStaticsTableBody = document.querySelector("#stableStaticsTable tbody");

  monsters.forEach((monster, index) => {
    const avaiableMinStar = monster.avaiableMinStar;

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
      const isUnavailable = star < avaiableMinStar;
      const monsterNumberCellId = getMonsterNumberCellId({ monsterId: monster.id, star });

      total += item[1];
      totalByStar[star] += number;
      tableBody += `
        <td class="star${star}">
          <div style="position: relative;">
            <span id="${monsterNumberCellId}" class="monsterNumber ${number === 0 ? "isZero" : ""}" style="visibility: ${isUnavailable ? "hidden" : "visible"}">${number}</span>
            <div class="noselect w3-hide number-control" style="visibility: ${isUnavailable ? "hidden" : "visible"}">
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

resetStableStaticsPage = () => {
  totalByStar = {
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

    let result = false;
    if (isStaticEnv) {
      result = static__uploadMonster({ star, monsterId, diff });
    } else {
      result = remote__uploadMonster({ star, monsterId, diff });
    }

    if (result) {
      document.getElementById("stableStaticsSaveState").innerText = "已是最新";
      
      const cellId = getMonsterNumberCellId({ monsterId, star });
      const cell = document.getElementById(cellId);
      const classList = document.getElementById(cellId).classList;

      if (cell.innerText == "0") {
        classList.toggle("isZero", true);
      } else {
        classList.toggle("isZero", false);
      }
    } else {
      throw Error();
    }
  } catch(error) {
    document.getElementById("stableStaticsSaveState").innerText = "同步失敗";
    console.error(error)
  }
}

static__uploadMonster = async({ star, monsterId, diff }) => {
  const monster = monsters.filter((m) => m.id === monsterId)[0];
  if (monster === undefined) {
    return false;
  }
  ls.setItem("monsters", JSON.stringify(monsters));

  const newEventId = Math.max(
    events[0]?.id, 
    events[events.length - 1]?.id, 
    0
  ) + 1; 
  events.push({
    id: newEventId || 1,
    type: "directly_change_number",
    monsterId,
    diff,
    star,
    time: (new Date()).toMyFormatString("yyyy-MM-dd hh:mm:ss"),
    isRecovered: false,
  });
  ls.setItem("events", JSON.stringify(events));

  return true;
}

remote__uploadMonster = async({ star, monsterId, diff }) => {
  const payload = JSON.stringify({ star, monsterId, diff });
  const res = await httpPost("/uploadJson", payload);
  const data = await res.json(); // or `await res.text();`
  return data.result;
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

getMonsterNumberCellId = ({ monsterId, star }) => {
  return `monsterNumberCell_${monsterId}_${star}`;
}