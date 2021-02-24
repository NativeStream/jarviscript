import {
  UserConnectedWebsocketEvent,
  UserDisconnectedWebsocketEvent,
} from "./types/index";
import { AppSubject } from "./../../AppSubject";
import { LoggerColors } from "../../logs/LoggerColors";
import { AbstractService, Service } from "../../resources/Service";
import observers from "./observers";
import env from "../../environment";
import { Server, ServerOptions, Socket } from "socket.io";
import { createServer } from "http";

@Service({
  observers,
  loggerColor: LoggerColors.BLUE,
  serviceName: "Websocket",
})
export class WebsocketService extends AbstractService {
  private socketOptions: ServerOptions = {
    cors: { origin: "*" }
  } as ServerOptions;
  private socketPort = env.websocket.port;
  public io: Server = new Server(this.socketOptions);

  public async init(): Promise<any> {
    this.io.sockets.on("connection", (socket: Socket) => {
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
