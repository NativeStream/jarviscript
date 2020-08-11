import { Message } from "@open-wa/wa-automate";
import app from "../../../app";
import playerEvents from "../../../interfaces/player/events";
import LoggerBuilder from "../../../logs/LoggerBuilder";

enum EnumCommands {
  ADD = "ADD",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
}

const commands = {
  [EnumCommands.ADD]: (from: string, ...args: Array<string>) => {
    const query = args[0];
    app.notify(playerEvents.request.REQUEST_PLAYER_APPEND, {
      data: {
        query,
      },
      user: from,
    });
  },
  [EnumCommands.PLAY]: (from: string) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_PLAY, { user: from });
  },
  [EnumCommands.PAUSE]: (from: string) => {
    app.notify(playerEvents.request.REQUEST_PLAYER_PAUSE, { user: from });
  },
};

export default class MessageHandler {
  public static exec(from: string, ...args: Array<string>) {
    LoggerBuilder.DEBUG("message exec", args);
    const command = args.shift().toUpperCase();
    commands[command](from, ...args);
  }

  public static handle(message: Message) {
    const body = message.body;
    if (body[0] == ".") {
      const query = body.replace(".", "");
      this.exec(message.from, ...query.split(" "));
    }
  }
}
