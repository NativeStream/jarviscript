import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Clear implements Observer {
  event: string = events.request.REQUEST_PLAYER_CLEAR;
  async callback(eventData: EventData) {
    const player = await PlayerController.clear();
    app.notify(events.emit.EMIT_PLAYER_CLEAR, {
      ...eventData,
      data: player,
    });
  }
}

export default new Clear();
