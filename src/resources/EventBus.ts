import { Socket } from "socket.io";
import { IClient } from "../interfaces/IClient";
import { IEvent } from "../interfaces/IEvent";

export class EventBus<T = any> {
  constructor(public event: IEvent, public data: T, client?: IClient) {
    if (client)
      this.client = client;
  }

  private _client: IClient = {};

  public get client(): IClient {
    return this._client;
  }

  public set client(object: IClient) {
    this._client = Object.assign(this._client, object);
  }
}
