import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

class PlayerEmpty implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_EMPTY;
  callback(eventData: EventData): void {
    const message = "Playlist is empty.";
    app.notify(events.WHATSAPP_RESPONSE, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerEmpty();
