import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

class PlayerQueryAdded implements Observer {
  event: string = playerEvents.PLAYER_QUERY_ADDED;
  callback(eventData: EventData): void {
    app.notify(events.WHATSAPP_SEND, eventData);
  }
}

export default new PlayerQueryAdded();
