import * as socketIO from "socket.io";
import app, { Service, Observer } from "../../app";
import LoggerBuilder from "../../logs/LoggerBuilder";
import observers from "./observers";

class Websocket implements Service {
  public serviceName: string = "Websocket";
  public observers: Array<Observer> = observers;
  public globalInstance: socketIO.Server;
  private options = {};

  async init(): Promise<void> {
    this.globalInstance = socketIO(this.options);

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
}

export default new Websocket();
