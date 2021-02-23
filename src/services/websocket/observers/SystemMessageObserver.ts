import { SystemMessageEvent } from './../../app/types/index';
import { AbstractObserver, Observer } from "../../../resources/Observer";

@Observer()
export default class SystemMessageObserver extends AbstractObserver {
  event = SystemMessageEvent;
  async callback(event: SystemMessageEvent): Promise<any> {
    this.service.io.sockets.emit("event", event.data);
  }
}
