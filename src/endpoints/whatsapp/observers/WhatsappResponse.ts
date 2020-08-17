import { Observer, EventData } from "../../../app";
import wppInstance from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";
import wppService from "../";

class WhatsappResponse implements Observer {
  event: string = events.WHATSAPP_RESPONSE;
  async callback(eventData: EventData): Promise<void> {
    if (wppService.serviceName == eventData.from) {
      const wpp = await wppInstance.getGlobalInstance();
      const message = eventData.data.message;
      LoggerBuilder.DEBUG(events.WHATSAPP_RESPONSE, eventData);
      const number = eventData?.user?.whatsapp;
      if (number) wpp.sendText(number, message);
    }
  }
}

export default new WhatsappResponse();
