import app, { Observer, EventData } from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import events from "../../events";

import { EMIT_PLAYER_PLAYLIST } from "../../../../interfaces/player/events/types";

class PlayerPlay implements Observer {
  event: string = playerEvents.emit.EMIT_PLAYER_PLAYLIST;
  callback(eventData: EventData): void {
    const data: EMIT_PLAYER_PLAYLIST = eventData.data;
    const curr = data.index;
    let message = "";

    data.songs.forEach((song, index) => {
      if (index == curr) message += "*";
      message += `${index} - ${song.title}`;
      if (index == curr) message += "* 🎶";
      message += "\n";
    });

    if (data.songs.length == 0) message = "Playlist empty.";

    app.notify(events.WHATSAPP_RESPONSE, {
      ...eventData,
      data: { message },
    });
  }
}

export default new PlayerPlay();
