import app, { Observer, EventData } from "../../../app";

class PlayerQueryAdded implements Observer {
  event: string = "PLAYER_QUERY_ADDED";
  callback(eventData: EventData): void {
    app.notify("SOCKET_SEND", eventData);
  }
}

export default new PlayerQueryAdded();
