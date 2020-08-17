import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class SendImageAsSticker implements Observer {
  event: string = events.WHATSAPP_SEND_IMAGE_AS_STICKER;

  async callback(eventData: EventData): Promise<void> {
    const wpp = await wppInstance.getGlobalInstance();
    const b64Image = eventData.data;
    const user = eventData.user;
    if (user?.whatsapp) wpp.sendImageAsSticker(user.whatsapp, b64Image);
  }
}

export default new SendImageAsSticker();
