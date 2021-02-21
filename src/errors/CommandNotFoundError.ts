export class CommandNotFoundError implements Error{
  name: string = "CommandNotFoundError";
  message: string;
  constructor(command: string) {
    Object.setPrototypeOf(this, CommandNotFoundError);
    this.message = `Command [${command}] not found.`;
  }
}