import { Observer, Service } from "../../app";
import observers from "./observers";
import MPV from "./services/MPV";
import Player from "./models/Player";

class PlayerService implements Service {
  public serviceName: string = "Player";
  public globalInstance?: MPV;
  public observers: Observer[] = observers;

  public player: Player = new Player();

  async init(): Promise<void> {
    this.globalInstance = this.getGlobalInstance();
  }

  getGlobalInstance() {
    if (!this.globalInstance) this.globalInstance = new MPV();
    return this.globalInstance;
  }
}

export default new PlayerService();
