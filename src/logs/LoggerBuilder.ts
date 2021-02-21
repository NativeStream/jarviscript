enum LogType {
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
  DEBUG = "DEBUG",
}

export const colors = {
  RESET: "\x1b[0m",
  [LogType.ERROR]: "\x1b[1;91m",
  [LogType.WARNING]: "\x1b[1;93m",
  [LogType.INFO]: "\x1b[1;96m",
  [LogType.DEBUG]: "\x1b[1;90m"
};

export class LoggerBuilder {
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
    return new LoggerBuilder(message, LogType.ERROR, error)
  }

  public static INFO(...args: Array<any>) {
    const message = this.createMessage(LogType.INFO, "");
    return new LoggerBuilder([message, ...args], LogType.INFO)
  }

  public static WARNING(...args: Array<any>) {
    const message = this.createMessage(LogType.WARNING, "");
    return new LoggerBuilder([message, ...args], LogType.WARNING)
  }

  public static DEBUG(...args: Array<any>) {
    const debugMessage = this.createMessage(LogType.DEBUG, "");
    return new LoggerBuilder([debugMessage, ...args], LogType.DEBUG)
  }

  private static createMessage(lt: LogType, txt: string, sv: string = "") {
    let logTypeString = "[" + colors[lt] + lt + colors.RESET + "]";
    if (sv) return `${sv} ${logTypeString} ${this.dateNow()} ${txt}`;
    return `${logTypeString} ${this.dateNow()} ${txt}`;
  }

  private static dateNow(): string {
    const date = new Date();
    return colors.DEBUG + date.toLocaleTimeString() + colors.RESET;
  }

  public log(): void {
    if (this.logType != LogType.ERROR /* && process.env.NODE_ENV == "dev"*/) {
      if (this.text instanceof Array) console.log(...this.text);
    } else /*if (this.logType != LogType.DEBUG)*/ console.log(this.text);

    if (this.logType == LogType.ERROR) console.log(this.errorHandle);
  }
}
