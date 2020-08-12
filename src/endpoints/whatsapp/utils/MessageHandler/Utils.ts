import { decryptMedia } from "@open-wa/wa-decrypt";
import { Message } from "@open-wa/wa-automate";
import app from "../../../../app";
import events from "../../events";
import LoggerBuilder from "../../../../logs/LoggerBuilder";

enum EnumCommands {
  STICKER = "STICKER",
}

export default {
  [EnumCommands.STICKER]: async (message: Message, url?: string) => {
    if (message.mimetype) {
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;

      app.notify(events.WHATSAPP_SEND_IMAGE_AS_STICKER, {
        user: message.from,
        data: imageBase64,
      });
    } else if (url) {
      app.notify(events.WHATSAPP_SEND_URL_AS_STICKER, {
        user: message.from,
        data: url,
      });
    }
  },
};
