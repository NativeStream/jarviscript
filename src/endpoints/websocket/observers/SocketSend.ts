import { Observer, EventData } from "../../../app";
import socketIO from "..";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class SocketSend implements Observer {
  event: string = events.SOCKET_SEND;
  async callback(eventData: EventData): Promise<void> {
    const socket = await socketIO.getGlobalInstance();
    LoggerBuilder.DEBUG("Socket send:", eventData);
    socket.emit("message", eventData);
  }
}

export default new SocketSend();
