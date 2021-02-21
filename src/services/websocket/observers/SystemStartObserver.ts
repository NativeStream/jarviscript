import { EventBus } from './../../../resources/EventBus';
import { WebsocketService } from "./../WebsocketService";
import { AbstractObserver, Observer } from "../../../resources/Observer";
import { SystemStart } from "../../app/types";

@Observer()
export default class SystemStartObserver extends AbstractObserver<WebsocketService> {
  event = SystemStart;
  async callback(eventBus: EventBus<typeof SystemStart.type>): Promise<any> {
    this.service.io.sockets.emit("event", eventBus);
  }
}
