import { Observer, EventData } from "../../../app";
import socketIO from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class SocketSend implements Observer {
  event: string = events.SOCKET_SEND;
  callback(eventData: EventData): void {
    const socket = socketIO.globalInstance;
    LoggerBuilder.DEBUG("Socket send:", eventData);
    socket.emit("message", eventData);
  }
}

export default new SocketSend();
