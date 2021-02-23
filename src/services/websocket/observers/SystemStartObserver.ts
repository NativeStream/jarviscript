import { WebsocketService } from "./../WebsocketService";
import { AbstractObserver, Observer } from "../../../resources/Observer";
import { SystemStartEvent } from "../../app/types";

@Observer()
export default class SystemStartObserver extends AbstractObserver<WebsocketService> {
  event = SystemStartEvent;
  async callback(event: SystemStartEvent): Promise<any> {
    this.service.io.sockets.emit("event", event);
  }
}
