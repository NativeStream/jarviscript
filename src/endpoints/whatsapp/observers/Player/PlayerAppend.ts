import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import { EMIT_PLAYER_QUERY_ADDED } from "../../../../interfaces/player/events/types";
import events from "../../events";

class PlayerAppend implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_APPEND;
  callback(eventData: EventData): void {
    const data: EMIT_PLAYER_QUERY_ADDED = eventData.data;
    const qtd = data.songs.length;
    let message = "";

    if (qtd > 1)
      message += `*${qtd}* songs added of playlist *${data.playlist_name}*.\n`;
    else message += `Song *${data.songs[0].title}* added.`;

    app.notify(events.WHATSAPP_SEND, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerAppend();
