class MonsterService {

  static uploadMonster = async({ star, monsterId, diff }) => {
    let result = false;
    if (isStaticEnv) {
      result = this.static__uploadMonster({ star, monsterId, diff });
    } else {
      result = this.remote__uploadMonster({ star, monsterId, diff });
    }
    return result;
  }
  
  static static__uploadMonster = async({ star, monsterId, diff }) => {
    const monster = monsters.filter((m) => m.id === monsterId)[0];
    if (monster === undefined) {
      return false;
    }
    ls.setItem("monsters", JSON.stringify(monsters));
  
    EventService.addDirectChangeEvents({
      monsterId, diff, star
    });
  
    return true;
  }

  static remote__uploadMonster = async({ star, monsterId, diff }) => {
    const payload = JSON.stringify({ star, monsterId, diff });
    const res = await httpPost("/uploadJson", payload);
    const data = await res.json(); // or `await res.text();`
    return data.result;
  }

}
