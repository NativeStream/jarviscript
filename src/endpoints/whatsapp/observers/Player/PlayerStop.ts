import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

class PlayerStop implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_STOP;
  callback(eventData: EventData): void {
    const message = `Player stopped.`;

    app.notify(events.WHATSAPP_SEND, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerStop();
