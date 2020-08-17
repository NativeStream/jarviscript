import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

import { EMIT_PLAYER_PREVIOUS } from "../../../../interfaces/player/events/types";

class PlayerPrevious implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_PREVIOUS;
  callback(eventData: EventData): void {
    const data: EMIT_PLAYER_PREVIOUS = eventData.data;
    const song = data.songs[data.index];
    const message = `Playing previous: *${song.title}*`;

    app.notify(events.WHATSAPP_RESPONSE, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerPrevious();
