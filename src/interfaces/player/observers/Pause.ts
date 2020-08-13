import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Pause implements Observer {
  event: string = events.request.REQUEST_PLAYER_PAUSE;
  async callback(eventData: EventData) {
    const player = await PlayerController.pause();
    app.notify(events.emit.EMIT_PLAYER_PAUSE, {
      ...eventData,
      data: player,
    });
  }
}

export default new Pause();
