import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

import { EMIT_PLAYER_NEXT } from "../../../../interfaces/player/events/types";

class PlayerNext implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_NEXT;
  callback(eventData: EventData): void {
    const data: EMIT_PLAYER_NEXT = eventData.data;
    const song = data.songs[data.index];
    const message = `Playing next: *${song.title}*`;

    app.notify(events.WHATSAPP_RESPONSE, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerNext();
