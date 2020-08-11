import app, { Observer, EventData } from "../../../app";
import playerService from "../";
import events from "../events";

class Status implements Observer {
  event: string = events.request.REQUEST_STATUS;
  callback(eventData: EventData): void {
    app.notify(events.emit.EMIT_STATUS, {
      ...eventData,
      data: playerService.player,
    });
  }
}

export default new Status();
