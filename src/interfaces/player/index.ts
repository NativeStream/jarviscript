import { Observer, Service } from "../../app";
import observers from "./observers";
import MPV from "./MPV";

class Player implements Service {
  public serviceName: string = "Player";
  public globalInstance: MPV;
  public observers: Observer[] = observers;

  async init(): Promise<void> {
    this.globalInstance = new MPV();
  }
}

export default new Player();
