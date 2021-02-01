let menuHistoryItem;
let menuFacebookItem;
let menuGithubRepoItem;

initMenuPage = async() => {
  menuHistoryItem = document.getElementById("menuHistoryItem");
  menuFacebookItem = document.getElementById("menuFacebookItem");
  menuGithubRepoItem = document.getElementById("menuGithubRepoItem");

  menuHistoryItem.addEventListener("click", () => {
    pushNamed("/History");
  });

  menuFacebookItem.addEventListener("click", () => {
    window.open('https://www.facebook.com/WJProgramer', '_blank');
  });

  menuGithubRepoItem.addEventListener("click", () => {
    window.open('https://github.com/wjprogramer/wjprogramer.github.io', '_blank');
  });

}