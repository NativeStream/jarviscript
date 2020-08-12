import app, { Observer, EventData } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";
import PlaylistEmptyError from "../errors/PlaylistEmptyError";

class RequestPlaylist implements Observer {
  event: string = events.request.REQUEST_PLAYER_PLAYLIST;
  async callback(eventData: EventData) {
    const player = PlayerController.SendPlaylists();
    app.notify(events.emit.EMIT_PLAYER_PLAYLIST, {
      ...eventData,
      data: player,
    });
  }
}

export default new RequestPlaylist();
