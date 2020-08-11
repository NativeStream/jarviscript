import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class WhatsappSend implements Observer {
  event: string = events.WHATSAPP_SEND;
  callback(eventData: EventData): void {
    const wpp = wppInstance.globalInstance;
    LoggerBuilder.DEBUG("Wpp send:", eventData);
    wpp.sendText(eventData.user, eventData.toString());
  }
}

export default new WhatsappSend();
