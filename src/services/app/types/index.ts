import { AbstractEvent } from '../../../resources/AbstractEvent';

export class SystemMessageEvent extends AbstractEvent {
  public data: string;
  constructor(message: string) {
    super();
    this.data = message;
  }
}

export class SystemStartEvent extends AbstractEvent {
  public data?: any = undefined;
}
