window.onload = () => {
  init();
}

let pageMainContent;

let navHomeButton;
let navStableStaticsButton;
let navMonsterSkillsButton;
let navMenuButton;

let routes = {};

init = async() => {
  pageMainContent = document.getElementById("pageMainContent");

  navHomeButton = document.getElementById("navHomeButton");
  navStableStaticsButton = document.getElementById("navStableStaticsButton");
  navMonsterSkillsButton = document.getElementById("navMonsterSkillsButton");
  navMenuButton = document.getElementById("navMenuButton");
  
  const pageList = [
    {
      route: "/",
      promise: httpGet("/html/Home.html"),
      init: () => {},
    },
    {
      route: "/StableStatics",
      promise: httpGet("/html/StableStatics.html"),
      init: initStableStaticsPage,
    },
    {
      route: "/MonsterSkills",
      promise: httpGet("/html/MonsterSkills.html"),
      init: initMonsterSkillsPage,
    },
    {
      route: "/Menu",
      promise: httpGet("/html/Menu.html"),
      init: initMenuPage,
    },
    {
      route: "/History",
      promise: httpGet("/html/History.html"),
      init: initHistoryPage,
    },
  ];

  let pageContents = [];
  await Promise
    .all(pageList.map((e) => e.promise).map(reflect))
    .then(function(results){
      pageContents = results.filter(x => x.status === "fulfilled");
      console.log(pageContents);
    });

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
  const route = routes[window.location.pathname];
  pageMainContent.innerHTML = route.pageContent;
  route.init();
}

let pushNamed = (pathName) => {
  window.history.pushState(
    {}, 
    pathName,
    window.location.origin + pathName
  );
  replacePageContent();
}