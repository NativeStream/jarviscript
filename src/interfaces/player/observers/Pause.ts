import { Observer } from "../../../app";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Pause implements Observer {
  event: string = events.PLAYER_PAUSE;
  from: string;
  callback(): void {
    PlayerController.pause();
  }
}

export default new Pause();
