let eventListElem;
let toggleClearEventsModalButton; 

const titleOfEventType = {
  "directly_change_number": "直接修改數量"
};

class HistoryPage {

  constructor(props) {
    try {
      this.init();
    } catch(err) {
      console.error(err);
      alert("初始化失敗");
    }
  }


  init = async() => {
    let jsonObject = await getMonsterRoot();
    events = jsonObject.events;
    
    let prevDate;
    let currDate;

    this.clearEventsModal = document.getElementById("clearEventsModal");
    this.clearEventsButton = document.getElementById("clearEventsButton");
  
    eventListElem = document.getElementById("eventList");
    toggleClearEventsModalButton = document.getElementById("toggleClearEventsModalButton");
  
    events.sort((a, b) => b.id - a.id);

    if (events.length === 0) {
      eventListElem.innerHTML = "<li>無資料</li>";
    }

    events.forEach((event) => {
  
      prevDate = currDate;
      currDate = event.time.substring(0, 10);
  
      if (currDate !== prevDate) {
        eventListElem.innerHTML += `
          <li>
            <h3>
              ${currDate}
            </h3>
          </li>
        `;
      }
  
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
        <div class="tooltip" onclick="currentPageInstance.deleteEvent('${event.id}')">
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
            <span>${this.getEventMessageByType(event)}</span><br/>
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

    clearEventsButton.addEventListener("click", () => {
      this.clearEventsModal.style.display='none';
      EventService.clearEvents();
      eventListElem.innerHTML = `<li>無資料</li>`;
    });
  
    // toggleClearEventsModalButton.addEventListener("click", () => {
      
    // });
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
      let result = await EventService.removeEvent(eventId);

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

}

