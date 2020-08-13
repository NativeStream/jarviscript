import * as socketIO from "socket.io";
import app, { Service, Observer } from "../../app";
import LoggerBuilder from "../../logs/LoggerBuilder";
import observers from "./observers";

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
        });
      });
    });

    this.globalInstance.listen(3000);
  }

  async getGlobalInstance(): Promise<socketIO.Server> {
    if (!this.globalInstance)
      this.globalInstance = socketIO.default(this.options);
    return this.globalInstance;
  }
}

export default new Websocket();
