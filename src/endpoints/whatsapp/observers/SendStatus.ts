import app, { Observer, EventData } from "../../../app";
import events from "../events";

class SendStatus implements Observer {
  event: string = "SEND_STATUS";
  callback(eventData: EventData): void {
    app.notify(events.WHATSAPP_SEND, eventData);
  }
}

export default new SendStatus();
