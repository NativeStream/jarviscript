import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

import { EMIT_PLAYER_GOTO } from "../../../../interfaces/player/events/types";

class PlayerPlay implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_GOTO;
  callback(eventData: EventData): void {
    const data: EMIT_PLAYER_GOTO = eventData.data;
    const song = data.songs[data.index];
    const message = `Playing now: *${song.title}*`;

    app.notify(events.WHATSAPP_RESPONSE, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerPlay();
