import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";
import OutOfBoundsPlaylistError from "../errors/OutOfBoundsPlaylistError";

class GoTo implements Observer {
  event: string = events.request.REQUEST_PLAYER_GOTO;
  from: string;
  async callback(eventData: EventData) {
    try {
      const index = eventData.data;
      const player = await PlayerController.goto(index);
      app.notify(events.emit.EMIT_PLAYER_GOTO, {
        ...eventData,
        data: player,
      });
    } catch (error) {
      if (error instanceof OutOfBoundsPlaylistError)
        app.notify(events.emit.EMIT_PLAYER_OUT_OF_BOUNDS, {
          ...eventData,
          data: {
            error,
          },
        });
    }
  }
}

export default new GoTo();
