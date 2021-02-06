class MaintainMonsterPage {

  constructor(props) {
    const pageType = props.monster ? PAGE_TYPE.EDIT : PAGE_TYPE.CREATE;

    this.state = {
      pageTitle: document.getElementById("pageTitle"),
      goBackButton: document.getElementById("goBackButton"),
      maintainForm: document.getElementById("maintainForm"),
      nameInput: document.getElementById("nameInput"),
      mainSkillSelect: document.getElementById("mainSkillSelect"),
      subSkillSelect: document.getElementById("subSkillSelect"),
      avaiableMinStarInput: document.getElementById("avaiableMinStarInput"),
      submitButton: document.getElementById("submitButton"),
      pageType,
      prevPath: props.prevPath,
      form: {
        name: "",
        position: "gold",
        mainSkill: "",
        subSkill: "",
        avaiableMinStar: 1,
      }
    }
    this.init(props);
  }

  init = async(props) => {
    const { monster, prevPath } = props;
    const {
      pageTitle, goBackButton, maintainForm, nameInput, avaiableMinStarInput, submitButton,
      pageType,
    } = this.state;

    pageTitle.innerText = pageType === PAGE_TYPE.EDIT ? "編輯野獸" : "新增野獸";
    submitButton.innerText = pageType === PAGE_TYPE.EDIT ? "更新" : "新增";

    if (prevPath === undefined) {
      goBackButton.style.display = "none";
    } else {
      goBackButton.addEventListener("click", () => {
        pushNamed(prevPath);
      });
    }

    this.addChangeHandler(nameInput);

    let positionRadios = document.getElementsByClassName("position-radio");
    for (const radio of positionRadios) {
      this.addChangeHandler(radio);
    }

    let skillSelectHTML = "";
    skills.forEach((skill) => {
      const { id, name } = skill;
      skillSelectHTML += `<option value="${id}">${name}</option>`;
    });

    mainSkillSelect.innerHTML += skillSelectHTML;
    this.addChangeHandler(mainSkillSelect);

    subSkillSelect.innerHTML += skillSelectHTML;
    this.addChangeHandler(subSkillSelect);

    this.addChangeHandler(avaiableMinStarInput);

    maintainForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });

    if (pageType === PAGE_TYPE.EDIT) {
      nameInput.value = monster.name;
      mainSkillSelect.value = monster.mainSkill;
      subSkillSelect.value = monster.subSkill;
      avaiableMinStarInput.value = monster.avaiableMinStar;
      
      this.state = {
        ...this.state,
        form: monster
      };

      for (const radio of positionRadios) {
        radio.checked = radio.value === monster.position;
      }
    }
  }

  addChangeHandler = (dom) => {
    dom.addEventListener("change", (e) => {
      this.updateForm(e);
    });
  }

  updateForm = (e) => {
    this.state.form[e.target.name] = e.target.value;
  }

  submit = async() => {
    try {
      const { pageType, prevPath, form } = this.state;
      let result = true;
      if (pageType === PAGE_TYPE.EDIT) {
        result = await MonsterService.update(form);
      } else {
        result = await MonsterService.create(form);
      }
      if (result) {
        alert(pageType === PAGE_TYPE.EDIT ? "更新成功" : "新增成功");
        if (prevPath) {
          pushNamed(prevPath);
        }
      } else {
        alert("失敗");
      }
    } catch (error) {
      console.error(error);
      alert("失敗");
    }
  }

}