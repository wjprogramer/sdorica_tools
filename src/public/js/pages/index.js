window.onload = () => {
  init();
}

let pageMainContent;

let navHomeButton;
let navStableStaticsButton;
let navMonsterSkillsButton;
let navMenuButton;

const pageList = [
  {
    route: "/",
    promise: () => httpGet("/html/Home.html"),
    init: initHomePage,
    localEnvPageContent: homePageContent,
  },
  {
    route: "/StableStatics",
    promise: () => httpGet("/html/StableStatics.html"),
    init: initStableStaticsPage,
    localEnvPageContent: stableStaticsPageContent,
  },
  {
    route: "/MonsterSkills",
    promise: () => httpGet("/html/MonsterSkills.html"),
    init: initMonsterSkillsPage,
    localEnvPageContent: monsterSkillsPageContent,
  },
  {
    route: "/Menu",
    promise: () => httpGet("/html/Menu.html"),
    init: initMenuPage,
    localEnvPageContent: menuPageContent,
  },
  {
    route: "/History",
    promise: () => httpGet("/html/History.html"),
    init: initHistoryPage,
    localEnvPageContent: historyPageContent,
  },
];

init = async() => {
  pageMainContent = document.getElementById("pageMainContent");

  navHomeButton = document.getElementById("navHomeButton");
  navStableStaticsButton = document.getElementById("navStableStaticsButton");
  navMonsterSkillsButton = document.getElementById("navMonsterSkillsButton");
  navMenuButton = document.getElementById("navMenuButton");

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

window.onpopstate = () => {
  replacePageContent();
}

replacePageContent = () => {
  if (isStaticEnv) {
    pushNamed("/");
    return;
  }
  const route = routes[window.location.pathname];
  pageMainContent.innerHTML = route.pageContent;
  route.init();
}

pushNamed = (pathName) => {
  if (isStaticEnv) {
    static__pushNamed(pathName);
  } else {
    remote__pushNamed(pathName);
  }
}

static__pushNamed = (pathName) => {
  const page = pageList.filter((e) => e.route === pathName)[0];
  if (page) {
    pageMainContent.innerHTML = page.localEnvPageContent;
    page.init();
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