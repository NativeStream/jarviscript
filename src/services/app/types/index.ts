import { IEvent } from './../../../interfaces/IEvent';

export const SystemMessage: IEvent = {
  event: "SYSTEM_MESSAGE_EVENT",
  type: {} as {
    message: string;
  }
}

export const SystemStart: IEvent = {
  event: "SYSTEM_START_EVENT",
  type: {} as {
    message: string;
  }
}
