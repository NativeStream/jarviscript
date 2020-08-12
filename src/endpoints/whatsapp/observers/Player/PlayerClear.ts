import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

class PlayerClear implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_CLEAR;
  callback(eventData: EventData): void {
    const message = `Playlist cleared.`;

    app.notify(events.WHATSAPP_SEND, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerClear();
