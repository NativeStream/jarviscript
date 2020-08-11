import playerEvents from "../../../../interfaces/player/events";
import app, { Observer, EventData } from "../../../../app";
import events from "../../events";

class PlayerObserver implements Observer {
  event: string;
  callback(eventData: EventData): void {
    app.notify(events.SOCKET_SEND, eventData);
  }
  constructor(event: string) {
    this.event = event;
  }
}

function playerObserversCreate() {
  let playerObservers: Array<Observer> = [];
  for (const event in playerEvents) {
    playerObservers.push(new PlayerObserver(event));
  }
  return playerObservers;
}

export default playerObserversCreate();
