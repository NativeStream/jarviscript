import { Socket } from "socket.io";
import { AbstractEvent } from "../../../resources/AbstractEvent";

export class UserConnectedWebsocketEvent extends AbstractEvent {
  constructor(public data: Socket) {
    super();
  }
}

export class UserDisconnectedWebsocketEvent extends AbstractEvent {
  constructor(public data: Socket) {
    super();
  }
}
