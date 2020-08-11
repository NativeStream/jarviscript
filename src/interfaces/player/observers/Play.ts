import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Play implements Observer {
  event: string = events.PLAYER_PLAY;
  from: string;
  async callback(eventData: EventData) {
    await PlayerController.play();
    app.notify("STATUS", eventData);
  }
}

export default new Play();
