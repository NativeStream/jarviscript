export class MessageWithoutPrefixError implements Error {
  name: string = "MessageWithoutPrefixError";
  message: string = "The message send does not have a command prefix.";
  constructor() {
    Object.setPrototypeOf(this, MessageWithoutPrefixError);
  }
}
