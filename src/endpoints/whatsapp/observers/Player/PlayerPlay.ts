import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

class PlayerPlay implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_PLAY;
  callback(eventData: EventData): void {
    const message = "Playing";

    app.notify(events.WHATSAPP_SEND, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerPlay();
