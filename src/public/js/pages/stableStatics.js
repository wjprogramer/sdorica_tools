let stableStaticsTableBody;
let totalByStar;

class StableStaticsPage {
  
  constructor(props) {
    try {
      this.init();
    } catch(err) {
      console.error(err);
      alert("初始化失敗");
    }
    this.state = {
      
    };
  }

  init = async() => {
    this.resetStableStaticsPage();

    stableStaticsTableBody = document.querySelector("#stableStaticsTable tbody");
  
    let tableBody = "";
    monsters.forEach((monster, index) => {
      const avaiableMinStar = monster.avaiableMinStar;
  
      let rowHtmlContent = "";
      rowHtmlContent += this.getMonsterNameCellHTML(monster);
  
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
        const monsterNumberCellId = this.getMonsterNumberCellId({ monsterId: monster.id, star });
  
        total += item[1];
        totalByStar[star] += number;
        rowHtmlContent += `
          <td class="star${star}">
            <div style="position: relative;">
              <span id="${monsterNumberCellId}" class="monsterNumber ${number === 0 ? "isZero" : ""}" style="visibility: ${isUnavailable ? "hidden" : "visible"}">${number}</span>
              <div class="noselect w3-hide number-control" style="visibility: ${isUnavailable ? "hidden" : "visible"}">
                <a 
                  style="cursor: pointer" 
                  onclick="currentPageInstance.setNumberOfStar({ star: ${star}, monsterId: '${monster.id}', diff: 1 })"
                >
                  <i class="material-icons w3-text-green">
                    add_circle_outline
                  </i>
                </a>
                <a 
                  style="cursor: pointer" 
                  onclick="currentPageInstance.setNumberOfStar({ star: ${star}, monsterId: '${monster.id}', diff: -1 })"
                >
                  <i class="material-icons w3-text-red">
                    remove_circle_outline
                  </i>
                </a>
              </div>
            </div>
          </td>
        `;
      });
      
      rowHtmlContent += `
        <td>
          <div style="display: flex; justify-content: flex-start; flex-direction: row;">
            <span class="total" style="flex: 1;">${total}</span>
          </div>
        </td>
      `;
  
      rowHtmlContent = `<tr id="monsterRow${monster.id}">
        ${rowHtmlContent}
      </tr>`;
  
      tableBody += rowHtmlContent;
    });

    stableStaticsTableBody.innerHTML = tableBody;
  
    Object.entries(totalByStar).forEach((e) => {
      const star = e[0];
      const number = e[1];
      this.updateTotalNumberByStar(star, number);
    });
  
    this.updateTotalNumber();
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

  getMonsterNameCellHTML = ({ name }) => {
    return `
      <th>
        <img
          src="images/70px-${name}_Monster_Icon.png"
          style="width: 30px; margin-right: 4px;"
          alt="${name}"
          title="${name}"
          class="monster-cover-image"
          onerror="this.src='images/not_found.png';"
        />
        <span class="trMonsterName">${name}</span>
      </th>
    `;
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
  
        this.updateTotalNumberByStar(star, totalByStar[star]);
        this.updateTotalNumber(diff);
  
        this.uploadMonster({ star, monsterId, diff });
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
      this.setSaveStateText("同步中");
  
      let result = MonsterService.uploadMonster({ star, monsterId, diff })

      if (result) {
        this.setSaveStateText("已是最新");
        
        const cellId = this.getMonsterNumberCellId({ monsterId, star });
        const cell = document.getElementById(cellId);
        const classList = document.getElementById(cellId).classList;
  
        classList.toggle("isZero", cell.innerText == "0");
      } else {
        throw Error();
      }
    } catch(error) {
      this.setSaveStateText("同步失敗");
      console.error(error)
    }
  }

  setSaveStateText = (text) => {
    document.getElementById("stableStaticsSaveState").innerText = text;
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

}