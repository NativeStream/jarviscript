import { Observer } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";

import app from "../../../app";

class Play implements Observer {
  event: string = "PLAYER_PLAY";
  from: string;
  callback(): void {
    LoggerBuilder.DEBUG("Event on player triggered");
    app.notify("SEND_DATA", { data: { playerStatus: "playing" } });
  }
}

export default new Play();
