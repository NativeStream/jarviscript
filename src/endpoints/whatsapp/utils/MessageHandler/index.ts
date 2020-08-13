import { Message } from "@open-wa/wa-automate";
import LoggerBuilder from "../../../../logs/LoggerBuilder";

import PlayerCommands from "./PlayerCommands";
import Miscellaneous from "./Miscellaneous";
import Utils from "./Utils";

interface ICommands {
  [key: string]: Function;
}

const commands: ICommands = {
  ...PlayerCommands,
  ...Miscellaneous,
  ...Utils,
};

export default class MessageHandler {
  public static exec(message: Message, ...args: Array<string>) {
    const command = args.shift();
    if (command) {
      const key = command.toUpperCase();
      LoggerBuilder.DEBUG("Executing command from WPP:", key, args);
      commands[key](message, ...args);
    }
  }

  public static handle(message: Message) {
    const body = message.body;
    const caption = message.caption;

    let command = undefined;

    if (body[0] == "." || caption[0] == ".")
      command = body[0] == "." ? body : caption;

    if (command) {
      const query = command.replace(".", "");
      this.exec(message, ...query.split(" "));
    }
  }
}
