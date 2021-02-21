import { AbstractCommand } from "./AbstractCommand";
import { systemCommands } from "./../commands/index";
import { ICommandsMap } from "./../interfaces/ICommandsList";
import { MessageWithoutPrefixError } from "../errors/MessageWithoutPrefixError";
import { CommandNotFoundError } from "../errors/CommandNotFoundError";
import { IClient } from "../interfaces/IClient";

export class CommandManager {
  private prefix: string = ".";
  private media?: any;
  private command?: string;
  private args?: string[];
  private systemCommands: ICommandsMap = systemCommands;

  private constructor(
    private textMessage: string,
    private client?: IClient,
    private serviceCommands?: ICommandsMap
  ) {}

  public static create(
    textMessage: string,
    client?: IClient,
    serviceCommands?: ICommandsMap
  ) {
    const manager = new CommandManager(
      textMessage.toLowerCase(),
      client,
      serviceCommands
    );
    manager.resolveTextMessage();
    return manager;
  }

  private resolveTextMessage() {
    const index = this.textMessage.indexOf(this.prefix);
    if (index !== 0) throw new MessageWithoutPrefixError();
    const textWithoutPrefix = this.textMessage.slice(this.prefix.length);
    const splited: string[] = textWithoutPrefix.split(" ");
    this.command = splited.shift();
    this.args = [...splited];
  }

  private findCommand(): AbstractCommand | undefined {
    const finder = (command: string) => command === this.command;
    if (this.serviceCommands) {
      const key = Object.keys(this.serviceCommands).find(finder);
      if (key) return this.serviceCommands[key];
    }
    const key = Object.keys(this.systemCommands).find(finder);
    if (key) return this.systemCommands[key];
  }

  public addMedia(media: any) {
    this.media = media;
    return this;
  }

  public execute() {
    const command = this.findCommand();
    if (!command || !this.command)
      throw new CommandNotFoundError(this.command || "");
    return command
      .create(this.command, this.args, this.media, this.client)
      .execute();
  }
}
