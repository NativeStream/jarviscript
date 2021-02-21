export class CommandInvalidError implements Error {
  name: string = "CommandInvalidError";
  constructor(public message: string) {
    Object.setPrototypeOf(this, CommandInvalidError);
  }
}
