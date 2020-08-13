import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Stop implements Observer {
  event: string = events.request.REQUEST_PLAYER_STOP;
  async callback(eventData: EventData) {
    const player = await PlayerController.stop();
    app.notify(events.emit.EMIT_PLAYER_STOP, {
      ...eventData,
      data: player,
    });
  }
}

export default new Stop();
