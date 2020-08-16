import app, { EventData } from "../../../app";

export interface ICommandData {
  query: string;
  body?: any;
}

export interface iEventDatas {
  event: string;
  eventData: EventData;
}

export interface ICommands {
  [key: string]: Command;
}

export default abstract class Command {
  public abstract help: string;

  public abstract validate(
    eventData: EventData,
    query: string,
    extraData?: any
  ): boolean;
  public abstract retrive(
    eventData: EventData,
    query: string,
    extraData?: any
  ): Promise<iEventDatas>;
}
