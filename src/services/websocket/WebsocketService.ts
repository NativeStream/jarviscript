import {
  UserConnectedWebsocketEvent,
  UserDisconnectedWebsocketEvent,
} from "./types/index";
import { AppSubject } from "./../../AppSubject";
import * as socketIO from "socket.io";
import { LoggerColors } from "../../logs/LoggerColors";
import { AbstractService, Service } from "../../resources/Service";
import observers from "./observers";
import env from "../../environment";

@Service({
  observers,
  loggerColor: LoggerColors.BLUE,
  serviceName: "Websocket",
})
export class WebsocketService extends AbstractService {
  private socketOptions: socketIO.ServerOptions = {};
  public io: socketIO.Server = socketIO.default(this.socketOptions);
  private socketPort = env.websocket.port;

  public async init(): Promise<any> {
    this.io.sockets.on("connection", (socket: socketIO.Socket) => {
      socket.on("event", (data: any) => {
        data.client = { socket };
        AppSubject.getInstance().notify(data);
      });

      AppSubject.getInstance().notify(new UserConnectedWebsocketEvent(socket));

      socket.on("disconnect", () => {
        AppSubject.getInstance().notify(
          new UserDisconnectedWebsocketEvent(socket)
        );
      });
    });
    this.io.listen(this.socketPort);
    this.logger.INFO("Websocket started on port", this.socketPort);
  }
}
