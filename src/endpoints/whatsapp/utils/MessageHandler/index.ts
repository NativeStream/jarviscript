import { Message } from "@open-wa/wa-automate";
import LoggerBuilder from "../../../../logs/LoggerBuilder";

import PlayerCommands from "./PlayerCommands";
import Miscellaneous from "./Miscellaneous";
import Utils from "./Utils";

const commands = {
  ...PlayerCommands,
  ...Miscellaneous,
  ...Utils,
};

export default class MessageHandler {
  public static exec(message: Message, ...args: Array<string>) {
    LoggerBuilder.DEBUG("message exec", args);
    const command = args.shift().toUpperCase();
    commands[command](message, ...args);
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
