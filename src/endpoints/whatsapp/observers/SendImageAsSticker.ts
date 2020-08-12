import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class SendImageAsSticker implements Observer {
  event: string = events.WHATSAPP_SEND_IMAGE_AS_STICKER;
  callback(eventData: EventData): void {
    const wpp = wppInstance.globalInstance;
    const b64Image = eventData.data;
    wpp.sendImageAsSticker(eventData.user, b64Image);
  }
}

export default new SendImageAsSticker();
