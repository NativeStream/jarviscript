import playerEvents from "../../../../interfaces/player/events";
import app, { Observer, EventData } from "../../../../app";
import events from "../../events";
import LoggerBuilder from "../../../../logs/LoggerBuilder";

class PlayerObserver implements Observer {
  event: string;

  constructor(event: string) {
    this.event = event;
  }

  callback(eventData: EventData): void {
    app.notify(events.SOCKET_SEND, {
      ...eventData,
      event: this.event,
    });
  }
}

function playerObserversCreate() {
  let playerObservers: Array<Observer> = [];
  for (const event in playerEvents.emit) {
    playerObservers.push(new PlayerObserver(event));
  }
  return playerObservers;
}

export default playerObserversCreate();
