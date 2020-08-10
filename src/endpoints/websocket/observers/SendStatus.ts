import app, { Observer, EventData } from "../../../app";

class SendStatus implements Observer {
  event: string = "SEND_STATUS";
  callback(eventData: EventData): void {
    app.notify("SOCKET_SEND", eventData);
  }
}

export default new SendStatus();
