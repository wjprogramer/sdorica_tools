let monsters;
let skills;
let events;
let isStaticEnv = false;

// static env
let staticBasePath = "";
const ls = localStorage;

switch(window.location.protocol) {
  case 'http:':
  case 'https:':
    //remote file over http or https
    if (window.location.host === "wjprogramer.github.io") {
      isStaticEnv = true;
    }
    break;
  case 'file:':
    //local file
    isStaticEnv = true;
    staticBasePath = window.location.href.split("/");
    staticBasePath = staticBasePath.slice(0, staticBasePath.length - 1).join("/");
    break;
  default: 
    //some other protocol
}

// common
getMonsterRoot = async() => {
  if (isStaticEnv) {
    return static__getMonsterRoot();
  } else {
    return await remote__getMonsterRoot();
  }
}

static__getMonsterRoot = () => {
  let monsters = static__getInitData("monsters");
  let skills = static__getInitData("skills");
  let events = static__getInitData("events");

  return {
    skills,
    monsters,
    events,
  };
}

static__getInitData = (key) => {
  let data = ls.getItem(key);
  if (data) {
    data = JSON.parse(data);
  } else {
    data = monsterEmptyData[key];
    ls.setItem(key, JSON.stringify(data));
  }
  return data;
}

remote__getMonsterRoot = async() => {
  const json = await httpGet("/json/monster.json");
  return JSON.parse(json);
}