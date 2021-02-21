import { Socket } from "socket.io";

export interface IClient {
  socket?: Socket;
  token?: string;
  number?: string;
  name?: string;
  role?: "owner" | "admin" |"guest";
}
