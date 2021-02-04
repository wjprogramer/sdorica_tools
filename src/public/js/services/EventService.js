class EventService {

  static removeEvent = async(eventId) => {
    let result = false;
    if (isStaticEnv) {
      result = this._static__deleteEvent(eventId);
    } else {
      result = this._remote__deleteEvent(eventId);
    }
    return result;
  }

  static _static__deleteEvent = async(eventId) => {
    events = events.filter((e) => e.id != eventId);
    ls.setItem("events", JSON.stringify(events));
    return true;
  }

  static _remote__deleteEvent = async(eventId) => {
    const res = await httpPost("/removeEvent", { eventId });
    const data = await res.json();
    return data.result;
  }

  /**
   * For static
   */
  static addDirectChangeEvents = async({ monsterId, diff, star }) => {
    const newEventId = Math.max(
      events[0]?.id, 
      events[events.length - 1]?.id, 
      0
    ) + 1; 
    events.push({
      id: newEventId || 1,
      type: "directly_change_number",
      monsterId,
      diff,
      star,
      time: (new Date()).toMyFormatString("yyyy-MM-dd hh:mm:ss"),
      isRecovered: false,
    });
    ls.setItem("events", JSON.stringify(events));
  }

}