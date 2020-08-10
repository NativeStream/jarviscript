import { Observer } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import playerService from "../";
import app from "../../../app";

class Next implements Observer {
  event: string = "PLAYER_NEXT";
  from: string;
  callback(): void {
    LoggerBuilder.DEBUG("Event triggered:", this.event);
  }
}

export default new Next();
