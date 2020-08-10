import * as socketIO from "socket.io";
import app, { Service, Observer } from "../../app";
import LoggerBuilder from "../../logs/LoggerBuilder";

export default class Websocket implements Service {
  public observers: Array<Observer> = [];
  public globalInstance: socketIO.Server;
  private options = {};

  init(): void {
    this.observers.push({
      event: "TESTE",
      from: "WEBSOCKET",
      callback: () => "teset",
    });

    this.globalInstance = socketIO(this.options);

    this.globalInstance.on("connection", (socket) => {
      LoggerBuilder.DEBUG(app);
      socket.emit("message", "Hello, world!");
      socket.on("instance", (message) => {
        console.log("Listened", app);
      });
    });

    this.globalInstance.listen(3000);
  }
}
