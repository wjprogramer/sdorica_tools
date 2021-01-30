window.onload = () => {
  init();
}

let pageMainContent;

let navHomeButton;
let navStableStaticsButton;
let navMonsterSkillsButton;
let navMenuButton;

let routes = {}

init = async() => {
  pageMainContent = document.getElementById("pageMainContent");

  navHomeButton = document.getElementById("navHomeButton");
  navStableStaticsButton = document.getElementById("navStableStaticsButton");
  navMonsterSkillsButton = document.getElementById("navMonsterSkillsButton");
  navMenuButton = document.getElementById("navMenuButton");
  
  const pageContentRequests = [
    httpGet("/html/Home.html"),
    httpGet("/html/StableStatics.html"),
    httpGet("/html/MonsterSkills.html"),
    httpGet("/html/Menu.html"),
  ];

  let pageContents = [];
  await Promise
    .all(pageContentRequests.map(reflect))
    .then(function(results){
      pageContents = results.filter(x => x.status === "fulfilled");
      console.log(pageContents);
    });

  routes = {
    '/': {
      pageContent: pageContents[0].v,
      init: () => {},
    },
    '/StableStatics': {
      pageContent: pageContents[1].v,
      init: initStableStaticsPage,
    },
    '/MonsterSkills': {
      pageContent: pageContents[2].v,
      init: () => {},
    },
    '/Menu': {
      pageContent: pageContents[3].v,
      init: () => {},
    },
  };

  replacePageContent();

  navHomeButton.addEventListener("click", () => {
    onNavItemClick("/");
  });

  navStableStaticsButton.addEventListener("click", () => {
    onNavItemClick("/StableStatics");
  });

  navMonsterSkillsButton.addEventListener("click", () => {
    onNavItemClick("/MonsterSkills");
  });

  navMenuButton.addEventListener("click", () => {
    onNavItemClick("/Menu");
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

let onNavItemClick = (pathName) => {
  window.history.pushState(
    {}, 
    pathName,
    window.location.origin + pathName
  );
  replacePageContent();
}