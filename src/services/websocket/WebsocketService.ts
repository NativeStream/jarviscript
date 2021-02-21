import { UserConnectWebsocket, UserDisconnectWebsocket } from "./types/index";
import { AppSubject } from "./../../AppSubject";
import * as socketIO from "socket.io";
import { LoggerColors } from "../../logs/LoggerColors";
import { AbstractService, Service } from "../../resources/Service";
import observers from "./observers";
import { EventBus } from "../../resources/EventBus";

@Service({
  observers,
  loggerColor: LoggerColors.BLUE,
  serviceName: "Websocket",
})
export class WebsocketService extends AbstractService {
  private socketOptions: socketIO.ServerOptions = {};
  public io: socketIO.Server = socketIO.default(this.socketOptions);
  private socketPort = parseInt(process.env.WEBSOCKET_PORT || "8081");

  public async init(): Promise<any> {
    this.io.sockets.on("connection", (socket: socketIO.Socket) => {
      socket.on("event", (data: EventBus) => {
        data.client = { socket };
        AppSubject.getInstance().notify(data);
      });

      AppSubject.getInstance().notify(
        new EventBus<typeof UserConnectWebsocket.type>(
          UserConnectWebsocket,
          { socket },
          { socket }
        )
      );

      socket.on("disconnect", () => {
        AppSubject.getInstance().notify(
          new EventBus<typeof UserDisconnectWebsocket.type>(
            UserDisconnectWebsocket,
            {}
          )
        );
      });
    });
    this.io.listen(this.socketPort);
    this.logger.INFO("Websocket started on port", this.socketPort);
  }
}
