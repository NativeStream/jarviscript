import { Observer } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import playerService from "../";
import app from "../../../app";

class Play implements Observer {
  event: string = "PLAYER_PLAY";
  from: string;
  callback(): void {
    LoggerBuilder.DEBUG("Event triggered:", this.event);
    // app.notify("SEND_DATA", { data: { playerStatus: "playing" } });
  }
}

export default new Play();
