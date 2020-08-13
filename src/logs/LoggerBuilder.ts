enum LogType {
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
  DEBUG = "DEBUG",
}

const colors = {
  RESET: "\x1b[0m",
  [LogType.ERROR]: "\x1b[1;91m",
  [LogType.WARNING]: "\x1b[1;93m",
  [LogType.INFO]: "\x1b[1;96m",
  [LogType.DEBUG]: "\x1b[1;90m",
};

export default class LoggerBuilder {
  private text: string | Array<any>;
  private errorHandle?: Error;
  private logType: LogType;

  constructor(
    text: string | Array<any>,
    logType: LogType,
    errorHandle?: Error
  ) {
    this.text = text;
    this.logType = logType;
    this.errorHandle = errorHandle;
  }

  public static ERROR(text: string, error: Error) {
    const message = this.createMessage(LogType.ERROR, text);
    new LoggerBuilder(message, LogType.ERROR, error).log();
  }

  public static INFO(text: string, service: string = "") {
    const message = this.createMessage(LogType.INFO, text, service);
    new LoggerBuilder(message, LogType.INFO).log();
  }

  public static WARNING(text: string, service: string = "") {
    const message = this.createMessage(LogType.WARNING, text, service);
    new LoggerBuilder(message, LogType.WARNING).log();
  }

  public static DEBUG(...args: Array<any>) {
    const debugMessage = this.createMessage(LogType.DEBUG, "");
    const messages = [debugMessage, ...args];
    new LoggerBuilder(messages, LogType.DEBUG).log();
  }

  private static createMessage(lt: LogType, txt: string, sv: string = "") {
    const logTypeString = "[" + colors[lt] + lt + colors.RESET + "]";
    if (sv) return `${logTypeString} ${sv} ${this.dateNow()} ${txt}`;
    return `${logTypeString} ${this.dateNow()} ${txt}`;
  }

  private static dateNow(): string {
    const date = new Date();
    return colors.DEBUG + date.toLocaleTimeString() + colors.RESET;
  }

  private log(): void {
    if (
      this.logType == LogType.DEBUG &&
      process.env.NODE_ENV == "development"
    ) {
      if (this.text instanceof Array) console.log(...this.text);
    } else if (this.logType != LogType.DEBUG) console.log(this.text);

    if (this.logType == LogType.ERROR) console.log(this.errorHandle);
  }
}
