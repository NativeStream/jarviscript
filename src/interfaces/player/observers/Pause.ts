import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Pause implements Observer {
  event: string = events.PLAYER_PAUSE;
  from: string;
  async callback(eventData: EventData) {
    await PlayerController.pause();
    app.notify("STATUS", eventData);
  }
}

export default new Pause();
