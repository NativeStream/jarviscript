import { Observer } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import events from "../events";

class Next implements Observer {
  event: string = events.request.REQUEST_PLAYER_NEXT;
  from: string;
  callback(): void {
    LoggerBuilder.DEBUG("Event triggered:", this.event);
  }
}

export default new Next();
