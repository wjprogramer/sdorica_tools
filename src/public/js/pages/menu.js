let menuHistoryItem;

initMenuPage = async() => {
  menuHistoryItem = document.getElementById("menuHistoryItem");

  menuHistoryItem.addEventListener("click", () => {
    pushNamed("/History");
  });
}