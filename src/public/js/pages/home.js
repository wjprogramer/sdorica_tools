let importMonstersJsonButton;
let exportMonstersJsonButton;
let monstersJsonFileInput;
let versionLabel;

class HomePage {
  

  constructor(props) {
    try {
      this.init();
    } catch(err) {
      console.error(err);
      alert("初始化失敗");
    }
  }

  init = () => {
    importMonstersJsonButton = document.getElementById("importMonstersJsonButton");
    exportMonstersJsonButton = document.getElementById("exportMonstersJsonButton");
    monstersJsonFileInput = document.getElementById("monstersJsonFileInput");
    versionLabel = document.getElementById("versionLabel");

    this.goMonsterListPageButton = document.getElementById("goMonsterListPageButton");
    this.goCreateMonsterPageButton = document.getElementById("goCreateMonsterPageButton");
    
    versionLabel.innerText = versionName;
  
    if (!isStaticEnv) {
      importMonstersJsonButton.style.display = "none"
    }
    importMonstersJsonButton.addEventListener("click", () => {
      monstersJsonFileInput.click();
    });
  
    exportMonstersJsonButton.addEventListener("click", () => {
      this.exportMonstersJson();
    });
  
    monstersJsonFileInput.addEventListener('change', (e) => {
      this.importMonstersJson(e);
    });

    this.goMonsterListPageButton.addEventListener("click", () => {
      pushNamed("/MonsterList");
    });

    this.goCreateMonsterPageButton.addEventListener("click", () => {
      pushNamed("/Monster/Create", {
        prevPath: "/",
      });
    });
  }

  importMonstersJson = (e) => {
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      this.onMonstersJsonReadComplete(text);
    };
    reader.readAsText(e.target.files[0]);
  }
  
  onMonstersJsonReadComplete = (text) => {
    try {
      const rootJsonObj = JSON.parse(text);
      ls.setItem("monsters", JSON.stringify(rootJsonObj.monsters));
      ls.setItem("skills", JSON.stringify(rootJsonObj.skills));
      ls.setItem("events", JSON.stringify(rootJsonObj.events));
  
      monsters = rootJsonObj.monsters;
      skills = rootJsonObj.skills;
      events = rootJsonObj.events;
  
    } catch (error) {
      console.error(error);
      alert("讀取時發生錯誤，請檢察格式");
    }
  }
  
  exportMonstersJson = async() => {
    try {
      const fileName = `sdorica_獸廄資料_${(new Date()).toLocaleString()}`;
      const jsonObj = await getMonsterRoot();
      const jsonString = JSON.stringify(jsonObj, null, "\t");
      const blob = new Blob([jsonString],{type:'application/json'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("匯出時發生錯誤");
    }
  }
}