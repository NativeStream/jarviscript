import app, { Observer, EventData } from "../../../app";
import events from "../events";
import PlayerController from "../controllers/PlayerController";
import OutOfBoundsPlaylistError from "../errors/OutOfBoundsPlaylistError";
import LoggerBuilder from "../../../logs/LoggerBuilder";

class NextAuto implements Observer {
  event: string = events.request.REQUEST_PLAYER_NEXT_AUTO;
  async callback(eventData: EventData): Promise<void> {
    try {
      const player = await PlayerController.next();
      app.notify(events.emit.EMIT_PLAYER_NEXT, { ...eventData, data: player });
    } catch (error) {
      if (error instanceof OutOfBoundsPlaylistError)
        app.notify(events.emit.EMIT_PLAYER_PLAYLIST_END, { ...eventData });
    }
  }
}

export default new NextAuto();
