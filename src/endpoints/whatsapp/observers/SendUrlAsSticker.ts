import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import events from "../events";

class SendUrlAsSticker implements Observer {
  event: string = events.WHATSAPP_SEND_URL_AS_STICKER;
  callback(eventData: EventData): void {
    const wpp = wppInstance.globalInstance;
    const url = eventData.data;
    wpp.sendStickerfromUrl(eventData.user, url);
  }
}

export default new SendUrlAsSticker();
