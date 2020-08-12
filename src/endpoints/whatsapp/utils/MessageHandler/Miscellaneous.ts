import app from "../../../../app";
import wppEvents from "../../events";
import { execSync } from "child_process";
import { Message } from "@open-wa/wa-automate";

enum EnumCommands {
  CMD = "CMD",
}

export default {
  [EnumCommands.CMD]: (message: Message, ...args: Array<string>) => {
    if (message.from == "MyNumber@c.us") {
      const stdout = execSync(args.join(" "), { encoding: "ascii" });
      app.notify(wppEvents.WHATSAPP_SEND, {
        user: message.from,
        data: { message: stdout },
      });
    }
  },
};
