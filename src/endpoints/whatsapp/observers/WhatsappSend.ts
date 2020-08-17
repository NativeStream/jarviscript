import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";
import wppService from "../";

class WhatsappSend implements Observer {
  event: string = events.WHATSAPP_SEND;
  async callback(eventData: EventData): Promise<void> {
    const wpp = await wppInstance.getGlobalInstance();
    const message = eventData.data.message;
    LoggerBuilder.DEBUG("Wpp send:", eventData);
    const user = eventData.user;
    if (user?.whatsapp) wpp.sendText(user.whatsapp, message);
  }
}

export default new WhatsappSend();
