import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

class PlayerPause implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_PAUSE;
  callback(eventData: EventData): void {
    const message = "Paused";

    app.notify(events.WHATSAPP_RESPONSE, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerPause();
