let monsterSkillsTable;
let indexOfSkill = {};
let skillsLength = 0;

class MonsterSkillsPage {

  constructor(props) {
    this.init();
    this.state = {

    };
  }

  init = async() => {
    try {
      this.reset();
  
      let jsonObject = await getMonsterRoot();
  
      monsters = jsonObject.monsters;
      skills = jsonObject.skills;
      skillsLength = skills.length;

      monsterSkillsTable = document.getElementById("monsterSkillsTable");
  
      this.initMonster();
  
      this.setSkillIndexMapping();
      this.renderTableHeader();
      this.renderTableBody();
      
      this.fillMonsterSkillTable();
    } catch (error) {
      alert("初始化錯誤");
      console.error(error);
    }
  }

  reset = () => {
    indexOfSkill = {};
    monsters = [];
    skills = [];
    skillsLength = 0;
  }
  
  initMonster = () => {
    monsters.forEach((monster) => {
      let singleSkillMonsterCount = 0;
      let doubleSkillMonsterCount = 0;
  
      Object.entries(monster.numberOfStar).forEach((numberOfStar) => {
        const star = parseInt(numberOfStar[0]);
        const count = parseInt(numberOfStar[1]);
        if (star < 5) {
          singleSkillMonsterCount += count;
        } else {
          doubleSkillMonsterCount += count;
        }
      });
  
      monster.singleSkillMonsterCount = singleSkillMonsterCount;
      monster.doubleSkillMonsterCount = doubleSkillMonsterCount;
    });
  }
  
  setSkillIndexMapping = () => {
    skills.forEach((skill, index) => {
      indexOfSkill[skill.id] = index;
    });
  }
  
  renderTableHeader = () => {
    const header = monsterSkillsTable.querySelector("thead tr");
    let content = "<th></th>";
    skills.forEach((skill, index) => {
      content += `
        <th>
          <img 
            src="images/24px-${skill.name}_Icon.png"
            alt="${skill.name}"
            title="${skill.name}"
          />
          ${skill.name}
        </th>
      `;
    });
    header.innerHTML = content;
  }
  
  renderTableBody = () => {
    let content = "";
    skills.forEach((skill, index) => {
      content += `
        <th>
          <img 
            src="images/24px-${skill.name}_Icon.png"
            alt="${skill.name}"
            title="${skill.name}"
          />
          ${skill.name}
        </th>
      `;
      for (let otherIndex = 0; otherIndex < skillsLength; otherIndex++) {
        const otherSkill = skills[otherIndex];
        const isSameSkills = skill.id === otherSkill.id;
        const style = isSameSkills ? "background-color: #153f4f;" : "";
  
        content += `<td 
          id="${this.getDoubleSkillCellID(skill.id, otherSkill.id)}"
          style="${style}"
        ></td>`;
      }
      content = `<tr>${content}</tr>`;
    });
  
    const bodyElem = monsterSkillsTable.querySelector("tbody");
    bodyElem.innerHTML = content;
  }
  
  getDoubleSkillCellID = (mainSkillId, subSkillId) => {
    return `cell_${mainSkillId}_${subSkillId}`;
  }
  
  fillMonsterSkillTable = () => {
    monsters.forEach((monster) => {
      const {
        mainSkill, subSkill,
        doubleSkillMonsterCount,
      } = monster;
  
      if (doubleSkillMonsterCount > 0) {
        const cellId = this.getDoubleSkillCellID(mainSkill, subSkill);
        const cellElem = document.getElementById(cellId);
        const prefix = cellElem.innerHTML !== "" ? "<br>" : "";

        const name = monster.name;
        cellElem.innerHTML += prefix + `
          <img
            src="images/70px-${name}_Monster_Icon.png"
            style="width: 30px; margin-right: 4px;"
            alt="${name}"
            title="${name}"
            class="monster-cover-image"
            onerror="this.src='images/70px-未知_Monster_Icon.png';"
          />
          ${name} x${doubleSkillMonsterCount}
        `;
      }
    });
  }

}

