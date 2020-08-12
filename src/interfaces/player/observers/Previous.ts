import app, { Observer, EventData } from "../../../app";
import events from "../events";
import PlayerController from "../controllers/PlayerController";
import OutOfBoundsPlaylistError from "../errors/OutOfBoundsPlaylistError";

class Previous implements Observer {
  event: string = events.request.REQUEST_PLAYER_PREVIOUS;
  from: string;
  async callback(eventData: EventData): Promise<void> {
    try {
      const player = await PlayerController.previous();
      app.notify(events.emit.EMIT_PLAYER_PREVIOUS, {
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

export default new Previous();
