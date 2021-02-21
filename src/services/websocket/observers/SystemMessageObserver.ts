import { EventBus } from './../../../resources/EventBus';
import { AbstractObserver, Observer } from "../../../resources/Observer";
import { SystemMessage } from "../../app/types";

@Observer()
export default class SystemMessageObserver extends AbstractObserver {
  event = SystemMessage;
  async callback(eventBus: EventBus<typeof SystemMessage.type>): Promise<any> {
    this.service.io.sockets.emit("event", eventBus.data);
  }
}
