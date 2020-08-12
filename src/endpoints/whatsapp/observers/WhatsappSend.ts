import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class WhatsappSend implements Observer {
  event: string = events.WHATSAPP_SEND;
  callback(eventData: EventData): void {
    const wpp = wppInstance.globalInstance;
    const message = eventData.data.message;
    LoggerBuilder.DEBUG("Wpp send:", eventData);
    if (eventData.user) wpp.sendText(eventData.user, message);
  }
}

export default new WhatsappSend();
