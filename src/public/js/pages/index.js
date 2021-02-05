window.onload = () => {
  init();
}

let mainContentContainer;
let loadingContent;

let navHomeButton;
let navStableStaticsButton;
let navMonsterSkillsButton;
let navMenuButton;

const pageList = [
  {
    route: "/",
    promise: () => httpGet("/Home.html"),
    localEnvPageContent: homePageContent,
    constructor: HomePage,
  },
  {
    route: "/StableStatics",
    promise: () => httpGet("/StableStatics.html"),
    localEnvPageContent: stableStaticsPageContent,
    constructor: StableStaticsPage,
  },
  {
    route: "/MonsterSkills",
    promise: () => httpGet("/MonsterSkills.html"),
    localEnvPageContent: monsterSkillsPageContent,
    constructor: MonsterSkillsPage,
  },
  {
    route: "/Menu",
    promise: () => httpGet("/Menu.html"),
    localEnvPageContent: menuPageContent,
    constructor: MenuPage,
  },
  {
    route: "/History",
    promise: () => httpGet("/History.html"),
    localEnvPageContent: historyPageContent,
    constructor: HistoryPage,
  },
];

init = async() => {
  mainContentContainer = document.getElementById("mainContentContainer");
  loadingContent = document.getElementById("loadingContent");

  navHomeButton = document.getElementById("navHomeButton");
  navStableStaticsButton = document.getElementById("navStableStaticsButton");
  navMonsterSkillsButton = document.getElementById("navMonsterSkillsButton");
  navMenuButton = document.getElementById("navMenuButton");

  await checkVersionOrUpdate();
  await loadData();

  events.sort((a, b) => b.id - a.id);

  let pageContents = [];
  if (isStaticEnv) {
    pageContents = pageList.map((e) => {
      return {
        v: e.localEnvPageContent,
      }
    });
  } else {
    await Promise
      .all(pageList.map((e) => e.promise()).map(reflect))
      .then(function(results){
        pageContents = results.filter(x => x.status === "fulfilled");
      });
  }

  pageList.forEach((page, index) => {
    routes[page.route] = {
      pageContent: pageContents[index].v,
      init: page.init,
      constructor: page.constructor,
    };
  })

  replacePageContent();

  navHomeButton.addEventListener("click", () => {
    pushNamed("/");
  });

  navStableStaticsButton.addEventListener("click", () => {
    pushNamed("/StableStatics");
  });

  navMonsterSkillsButton.addEventListener("click", () => {
    pushNamed("/MonsterSkills");
  });

  navMenuButton.addEventListener("click", () => {
    pushNamed("/Menu");
  });

}

checkVersionOrUpdate = async() => {
  versionCode = ls.getItem("versionCode");
  versionName = ls.getItem("versionName");
  if (versionCode && !VersionUpdater.isLatestVersion(versionCode)) {
    await VersionUpdater.updateVersion(versionCode);
  } else {
    ls.setItem("versionCode", versionCode || currentVersionCode);
    ls.setItem("versionName", versionName || currentVersionName);
  }
}

loadData = async() => {
  const jsonObject = await getMonsterRoot();

  monsters = jsonObject.monsters;
  events = jsonObject.events;
  skills = jsonObject.skills;
}

window.onpopstate = () => {
  replacePageContent();
}

replacePageContent = async() => {
  if (isStaticEnv) {
    pushNamed("/");
    return;
  }
  setLoading(true);
  const route = routes[window.location.pathname];
  mainContentContainer.innerHTML = route.pageContent;
  currentPageInstance
  currentPageInstance = new route.constructor();
  setLoading(false);
}

pushNamed = (pathName) => {
  if (isStaticEnv) {
    static__pushNamed(pathName);
  } else {
    remote__pushNamed(pathName);
  }
}

static__pushNamed = async(pathName) => {
  const page = pageList.filter((e) => e.route === pathName)[0];
  if (page) {
    setLoading(true);
    mainContentContainer.innerHTML = page.localEnvPageContent;
    currentPageInstance = new page.constructor();
    setLoading(false);
  }
}

remote__pushNamed = (pathName) => {
  window.history.pushState(
    {}, 
    pathName,
    window.location.origin + pathName
  );
  replacePageContent();
}

setLoading = (isLoading) => {
  mainContentContainer.style.display = 
    isLoading ? "none" : "block";
  loadingContent.style.display = 
    isLoading ? "block" : "none";
}
