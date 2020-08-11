import app, { Observer } from "../../../app";
import playerService from "../";
import events from "../events";

class Status implements Observer {
  event: string = "STATUS";
  callback(): void {
    app.notify(events.SEND_STATUS, {
      data: playerService.player,
    });
  }
}

export default new Status();
