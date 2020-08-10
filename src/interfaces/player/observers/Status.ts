import app, { Observer } from "../../../app";
import playerService from "../";

class Status implements Observer {
  event: string = "STATUS";
  callback(): void {
    app.notify("SEND_STATUS", {
      data: playerService.player,
    });
  }
}

export default new Status();
