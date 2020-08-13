import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";
import PlaylistEmptyError from "../errors/PlaylistEmptyError";

class Play implements Observer {
  event: string = events.request.REQUEST_PLAYER_PLAY;
  async callback(eventData: EventData) {
    try {
      const player = await PlayerController.play();
      app.notify(events.emit.EMIT_PLAYER_PLAY, {
        ...eventData,
        data: player,
      });
    } catch (error) {
      if (error instanceof PlaylistEmptyError)
        app.notify(events.emit.EMIT_PLAYER_EMPTY, {
          ...eventData,
          data: {
            error,
          },
        });
    }
  }
}

export default new Play();
