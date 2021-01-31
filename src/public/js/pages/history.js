let eventListElem;

const titleOfEventType = {
  "directly_change_number": "直接修改數量"
};

initHistoryPage = async() => {
  let jsonObject = await getMonsterRoot();
  events = jsonObject.events;

  eventListElem = document.getElementById("eventList");

  events.sort((a, b) => b.id - a.id);
  events.forEach((event) => {
    const changeStateButton = event.isRecovered
    ? `
      <div class="tooltip">
        <i class="material-icons">
          undo
        </i>
        <span class="tooltiptext tooltiptext-top">重新作用</span>
      </div>
    `
    : `<div class="tooltip">
        <i class="material-icons">
        restore
        </i>
        <span class="tooltiptext tooltiptext-top">回復事件</span>
      </div>`;

    const deleteEventButton = `
      <div class="tooltip" onclick="deleteEvent('${event.id}')">
        <i class="material-icons w3-text-red">
          delete
        </i>
        <span class="tooltiptext tooltiptext-top">刪除事件</span>
      </div>
    `;

    eventListElem.innerHTML += `
      <li id="eventItem${event.id}" class="eventItem w3-bar w3-display-container w3-hover-light-gray w3-border">
        <div class="w3-bar-item">
          <div class="title">
            <b class="w3-large">${titleOfEventType[event.type]}</b><br/>
          </div>
          <span>${getEventMessageByType(event)}</span><br/>
          <span>${event.time}</span>
        </div>
        <span class="w3-display-right noselect">
          <!-- TODO ${changeStateButton} -->
          ${deleteEventButton}
          &nbsp;&nbsp;&nbsp;
        </span>
      </li>
    `;
  });
}

getEventMessageByType = (event) => {
  const { type } = event;
  switch(type) {
    case "directly_change_number":
      const { monsterId, star, diff } = event;
      const sign = diff > 0 ? "+" : "";
      const color = diff > 0 ? "green" : "red";
      return `${monsterId} ${star}⭐ <b class="w3-text-${color}">${sign}${diff}</b>`;
  }
}

deleteEvent = async(eventId) => {
  try {
    result = false;
    if (isStaticEnv) {
      result = static__deleteEvent(eventId);
    } else {
      result = remote__deleteEvent(eventId);
    }

    if (result) {
      document.getElementById(`eventItem${eventId}`)?.remove();
    } else {
      throw Error();
    }
  } catch(error) {
    console.error(error);
    alert("刪除失敗")
  }
}

static__deleteEvent = async(eventId) => {
  events = events.filter((e) => e.id != eventId);
  ls.setItem("events", JSON.stringify(events));
  return true;
}

remote__deleteEvent = async(eventId) => {
  const res = await httpPost("/removeEvent", { eventId });
  const data = await res.json();
  return data.result;
}

