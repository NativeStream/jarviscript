import { IClient } from "../interfaces/IClient";

export abstract class AbstractEvent {
  constructor(data?: any) {}

  public client?: IClient;
  public abstract data?: any;

  public oldEvent(event: AbstractEvent) {
    this.client = event.client;
    return this;
  }
}
