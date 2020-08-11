import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";
import PlaylistEmptyError from "../errors/PlaylistEmtpyError";

class Play implements Observer {
  event: string = events.request.REQUEST_PLAYER_PLAY;
  from: string;
  async callback(eventData: EventData) {
    try {
      await PlayerController.play();
      app.notify(events.emit.EMIT_PLAYER_PLAY, eventData);
    } catch (error) {
      if (error instanceof PlaylistEmptyError)
        app.notify(events.emit.EMIT_PLAYER_EMPTY, eventData);
    }
  }
}

export default new Play();
