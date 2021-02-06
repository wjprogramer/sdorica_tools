class MonsterService {

  static create = async(payload) => {
    let result = false;
    if (isStaticEnv) {
      result = this.static__create(payload);
    } else {
      result = this.remote__create(payload);
    }
    return result;
  }

  static static__create = async(payload) => {
    const existMonster = monsters.filter((m) => m.name === payload.name)[0];
    if (existMonster) {
      return false;
    }
    const { name, position, mainSkill, subSkill, avaiableMinStar } = payload;
    // TODO update version
    monsters.push({
			id: name,
			name: name,
			position: position,
			mainSkill: mainSkill,
			subSkill: subSkill,
			avaiableMinStar: avaiableMinStar,
      isDefault: false,
			numberOfStar: {
				"1": 0,
				"2": 0,
				"3": 0,
				"4": 0,
				"5": 0,
				"6": 0,
				"7": 0,
				"8": 0,
				"9": 0
			}
		});
    return true;
  }

  static remote__create = async(payload) => {
    return true;
  }

  static update = async(payload) => {
    let result = false;
    if (isStaticEnv) {
      result = this.static__update(payload);
    } else {
      result = this.remote__update(payload);
    }
    return result;
  }

  static static__update = async(payload) => {
    return true;
  }

  static remote__update = async(payload) => {
    return true;
  }

  static changeNumber = async({ star, monsterId, diff }) => {
    let result = false;
    if (isStaticEnv) {
      result = this.static__changeNumber({ star, monsterId, diff });
    } else {
      result = this.remote__changeNumber({ star, monsterId, diff });
    }
    return result;
  }
  
  static static__changeNumber = async({ star, monsterId, diff }) => {
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

  static remote__changeNumber = async({ star, monsterId, diff }) => {
    const payload = JSON.stringify({ star, monsterId, diff });
    const res = await httpPost("/uploadJson", payload);
    const data = await res.json(); // or `await res.text();`
    return data.result;
  }

}
