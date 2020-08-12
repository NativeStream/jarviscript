import app from "../../../../app";
import playerEvents from "../../../../interfaces/player/events";
import { Message } from "@open-wa/wa-automate";

enum EnumCommands {
  ADD = "ADD",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  NEXT = "NEXT",
  PREVIOUS = "PREVIOUS",
  CLEAR = "CLEAR",
  STOP = "STOP",
  QUEUE = "QUEUE",
  GOTO = "GOTO",
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
  [EnumCommands.NEXT]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_NEXT, {
      user: message.from,
    });
  },
  [EnumCommands.PREVIOUS]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_PREVIOUS, {
      user: message.from,
    });
  },
  [EnumCommands.CLEAR]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_CLEAR, {
      user: message.from,
    });
  },
  [EnumCommands.STOP]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_STOP, {
      user: message.from,
    });
  },
  [EnumCommands.QUEUE]: (message: Message) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_PLAYLIST, {
      user: message.from,
    });
  },
  [EnumCommands.GOTO]: (message: Message, number: string) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_GOTO, {
      user: message.from,
      data: parseInt(number),
    });
  },
};
