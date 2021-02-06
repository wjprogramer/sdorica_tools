updateVersion_v1_1_0_code_2 = async() => {
  monsters.forEach((monster) => {
    monster.isDefault = true;
    monster.series = "normal";
  });
  ls.setItem("monsters", JSON.stringify(monsters));
}