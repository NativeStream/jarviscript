import app from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import { Message } from "@open-wa/wa-automate";

enum EnumCommands {
  ADD = "ADD",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
}

export default {
  [EnumCommands.ADD]: (message: Message, ...args: Array<string>) => {
    const query = args[0];
    app.notify(playerEvents.request.REQUEST_PLAYER_APPEND, {
      data: {
        query,
      },
      user: message.from,
    });
  },
  [EnumCommands.PLAY]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_PLAY, {
      user: message.from,
    });
  },
  [EnumCommands.PAUSE]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_PAUSE, {
      user: message.from,
    });
  },
};
