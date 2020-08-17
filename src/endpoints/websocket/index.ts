import * as socketIO from "socket.io";
import app, { Service, Observer } from "../../app";
import UserController from "../../app/controllers/UserController";
import { RegisterUser } from "../../app/models/User";
import LoggerBuilder from "../../logs/LoggerBuilder";
import observers from "./observers";
import events from "./events";

class Websocket implements Service {
  public serviceName: string = "Websocket";
  public observers: Array<Observer> = observers;
  public globalInstance?: socketIO.Server;
  private options = {};

  async init(): Promise<void> {
    this.globalInstance = await this.getGlobalInstance();

    this.globalInstance.on("connection", (socket) => {
      socket.on("event", (recived: any) => {
        LoggerBuilder.DEBUG("Socket recived:", recived);
        app.notify(recived.event, {
          data: recived.data,
          from: this.serviceName,
        });
      });

      socket.on("register", async (newUser: RegisterUser) => {
        let data;
        try {
          data = await UserController.register(newUser);
        } catch (error) {
          data = error;
        }

        app.notify(events.SOCKET_SEND, {
          from: this.serviceName,
          data,
        });
      });
    });

    const port = parseInt(process.env.WEBSOCKET_PORT || "8081");

    this.globalInstance.listen(port);
  }

  async getGlobalInstance(): Promise<socketIO.Server> {
    if (!this.globalInstance)
      this.globalInstance = socketIO.default(this.options);
    return this.globalInstance;
  }
}

export default new Websocket();
