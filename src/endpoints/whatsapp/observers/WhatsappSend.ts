import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class WhatsappSend implements Observer {
  event: string = events.WHATSAPP_SEND;
  async callback(eventData: EventData): Promise<void> {
    const wpp = await wppInstance.getGlobalInstance();
    const message = eventData.data.message;
    LoggerBuilder.DEBUG("Wpp send:", eventData);
    if (eventData.user) wpp.sendText(eventData.user, message);
  }
}

export default new WhatsappSend();
