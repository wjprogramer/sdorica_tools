class MaintainMonsterPage {

  constructor(props) {
    this.state = {
      pageTitle: document.getElementById("pageTitle"),
      goBackButton: document.getElementById("goBackButton"),
    }
    this.init(props);
  }

  init = async(props) => {
    const { monster, prevPath } = props;
    const { pageTitle, goBackButton } = this.state;

    pageTitle.innerText = monster ? "編輯野獸" : "新增野獸";

    if (prevPath === undefined) {
      goBackButton.style.display = "none";
    } else {
      goBackButton.addEventListener("click", () => {
        pushNamed(prevPath);
      });
    }
  }

}