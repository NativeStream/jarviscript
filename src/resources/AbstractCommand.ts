import { CommandInvalidError } from "../errors/CommandInvalidError";
import { IClient } from "../interfaces/IClient";

export abstract class AbstractCommand {
  protected help: string = "This command has no help message.";

  protected command: string = "";
  protected args?: string[] = [];
  protected media?: any;
  protected client?: IClient;

  public abstract action(): Promise<any>;

  public create(
    command: string,
    args?: string[],
    media?: any,
    client?: IClient
  ) {
    this.command = command;
    this.args = args;
    this.media = media;
    this.client = client;
    return this;
  }

  protected validate(): boolean {
    return true;
  }

  public execute() {
    if (!this.validate()) throw new CommandInvalidError(this.help);
    return this.action();
  }
}
