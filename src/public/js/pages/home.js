let importMonstersJsonButton;
let exportMonstersJsonButton;
let monstersJsonFileInput;

let routes = {};

initHomePage = async() => {
  importMonstersJsonButton = document.getElementById("importMonstersJsonButton");
  exportMonstersJsonButton = document.getElementById("exportMonstersJsonButton");
  monstersJsonFileInput = document.getElementById("monstersJsonFileInput");

  if (!isStaticEnv) {
    importMonstersJsonButton.style.display = "none"
  }
  importMonstersJsonButton.addEventListener("click", () => {
    monstersJsonFileInput.click();
  });

  exportMonstersJsonButton.addEventListener("click", () => {
    exportMonstersJson();
  });

  monstersJsonFileInput.addEventListener('change', (e) => {
    importMonstersJson(e);
  });
}

importMonstersJson = (e) => {
  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result);
    onMonstersJsonReadComplete(text);
  };
  reader.readAsText(e.target.files[0]);
}

onMonstersJsonReadComplete = (text) => {
  try {
    const rootJsonObj = JSON.parse(text);
    ls.setItem("monsters", JSON.stringify(rootJsonObj.monsters));
    ls.setItem("skills", JSON.stringify(rootJsonObj.skills));
    ls.setItem("events", JSON.stringify(rootJsonObj.events));
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