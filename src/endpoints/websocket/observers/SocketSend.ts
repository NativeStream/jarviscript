import { Observer, EventData } from "../../../app";
import socketIO from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";

class SendData implements Observer {
  event: string = "SOCKET_SEND";
  callback(eventData: EventData): void {
    const socket = socketIO.globalInstance;
    LoggerBuilder.DEBUG("Socket send:", eventData);
    socket.emit("message", eventData);
  }
}

export default new SendData();