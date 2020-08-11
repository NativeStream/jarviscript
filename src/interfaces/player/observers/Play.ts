import { Observer } from "../../../app";
import PlayerController from "../controllers/PlayerController";

class Play implements Observer {
  event: string = "PLAYER_PLAY";
  from: string;
  callback(): void {
    PlayerController.play();
  }
}

export default new Play();
