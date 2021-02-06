class MonsterListPage {

  constructor(props) {
    this.state = {
      nameOfSkills: {},
    };

    try {
      this.init();
    } catch (error) {
      console.error(error);
      alert("初始化錯誤");
    }
  }

  init = async() => {
    this.monsterListElem = document.getElementById("monsterList");
    this.goBackButton = document.getElementById("goBackButton");

    const nameOfSkills = {};
    skills.forEach((skill) => {
      nameOfSkills[skill.id] = skill.name;
    })
    this.state.nameOfSkills = nameOfSkills;

    let listHTML = "";
    monsters.forEach((monster) => {
      const { id, name, mainSkill, subSkill, avaiableMinStar, isDefault } = monster;

      const goDetailsButton = `<div id="${this.getEditMonsterButtonId(id)}" class="tooltip">
        <i class="material-icons">
          edit
        </i>
        <span class="tooltiptext tooltiptext-top">編輯</span>
      </div>`;

      listHTML += `
        <li id="monsterItem${monster.id}" class="eventItem w3-bar w3-display-container w3-hover-light-gray w3-border" style="overflow: visible;">
          <div class="w3-bar-item">
            <img
              src="images/70px-${name}_Monster_Icon.png"
              style=""
              alt="${name}"
              title="${name}"
              class="monster-cover-image"
              onerror="this.src='images/70px-未知_Monster_Icon.png';"
            />
          </div>
          <div class="w3-bar-item">
            <div class="title">
              <b class="w3-large">${name}</b><br/>
            </div>
            <span>
              技能:
              <img src="images/24px-${nameOfSkills[mainSkill]}_Icon.png">
              <img src="images/24px-${nameOfSkills[subSkill]}_Icon.png">,
              最小星數: ${avaiableMinStar}
            </span>
          </div>
          <span class="w3-display-right noselect">
            ${isDefault ? "" : goDetailsButton}
            &nbsp;&nbsp;&nbsp;
          </span>
        </li>
      `;
    });

    this.monsterListElem.innerHTML = listHTML;

    monsters.forEach((monster) => {
      const id = this.getEditMonsterButtonId(monster.id);
      const button = document.getElementById(id);
      button?.addEventListener("click", () => {
        pushNamed("/Monster/Details", {
          monster,
          prevPath: "/MonsterList",
        });
      });
    });

    this.goBackButton.addEventListener("click", () => {
      if (isStaticEnv) {
        pushNamed("/");
      } else {
        // TODO
      }
    });
  }

  getEditMonsterButtonId = (id) => {
    return `edit_button_${id}`;
  }

}