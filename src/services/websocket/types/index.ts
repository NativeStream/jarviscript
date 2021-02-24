import * as SocketIO from "socket.io";
import { AbstractEvent } from "../../../resources/AbstractEvent";

export class UserConnectedWebsocketEvent extends AbstractEvent {
  constructor(public data?: SocketIO.Socket) {
    super();
  }
}

export class UserDisconnectedWebsocketEvent extends AbstractEvent {
  constructor(public data?: SocketIO.Socket) {
    super();
  }
}
