import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Pause implements Observer {
  event: string = events.request.REQUEST_PLAYER_PAUSE;
  from: string;
  async callback(eventData: EventData) {
    await PlayerController.pause();
    app.notify(events.emit.EMIT_PLAYER_PAUSE, eventData);
  }
}

export default new Pause();
