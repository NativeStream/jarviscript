import { Socket } from "socket.io";
import { IEvent } from "../../../interfaces/IEvent";

export const UserConnectWebsocket: IEvent = {
  event: "USER_CONNECT_WEBSOCKET_EVENT",
  type: {} as {
    socket: Socket;
  },
};

export const UserDisconnectWebsocket: IEvent = {
  event: "USER_DISCONNECT_WEBSOCKET_EVENT",
  type: {} as {
    socket: Socket;
  },
};
