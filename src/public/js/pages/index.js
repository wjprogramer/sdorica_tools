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
    page: HomePage,
  },
  {
    route: "/StableStatics",
    promise: () => httpGet("/StableStatics.html"),
    localEnvPageContent: stableStaticsPageContent,
    page: StableStaticsPage,
  },
  {
    route: "/MonsterSkills",
    promise: () => httpGet("/MonsterSkills.html"),
    localEnvPageContent: monsterSkillsPageContent,
    page: MonsterSkillsPage,
  },
  {
    route: "/Menu",
    promise: () => httpGet("/Menu.html"),
    localEnvPageContent: menuPageContent,
    page: MenuPage,
  },
  {
    route: "/History",
    promise: () => httpGet("/History.html"),
    localEnvPageContent: historyPageContent,
    page: HistoryPage,
  },
];

init = async() => {
  mainContentContainer = document.getElementById("mainContentContainer");
  loadingContent = document.getElementById("loadingContent");

  navHomeButton = document.getElementById("navHomeButton");
  navStableStaticsButton = document.getElementById("navStableStaticsButton");
  navMonsterSkillsButton = document.getElementById("navMonsterSkillsButton");
  navMenuButton = document.getElementById("navMenuButton");

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
      page: page.page,
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
  currentPageInstance = new route.page();
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
    currentPageInstance = new page.page();
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
