import { colors, LoggerBuilder } from "./LoggerBuilder";
import { LoggerColors } from "./LoggerColors";

export class LoggerService {
  private loggerBuilder?: LoggerBuilder;
  constructor(
    private serviceName: string,
    private _serviceColor: LoggerColors
  ) {}

  private get serviceColor() {
    if (this._serviceColor === LoggerColors.RANDOM) {
      const colors = Object.keys(LoggerColors).filter(
        (value) => value !== LoggerColors.RANDOM
      );
      // @ts-ignore
      return LoggerColors[colors[Math.floor(Math.random() * colors.length)]];
    }
    return this._serviceColor;
  }

  private printServiceString() {
    const serviceString = `[${this.serviceColor}${this.serviceName}${colors.RESET}]`;
    process.stdout.write(serviceString);
  }

  public ERROR(text: string, error: Error) {
    this.printServiceString();
    this.loggerBuilder = LoggerBuilder.ERROR(text, error);
    this.loggerBuilder?.log();
  }

  public INFO(...args: Array<any>) {
    this.printServiceString();
    this.loggerBuilder = LoggerBuilder.INFO(...args);
    this.loggerBuilder?.log();
  }

  public WARNING(...args: Array<any>) {
    this.printServiceString();
    this.loggerBuilder = LoggerBuilder.WARNING(...args);
    this.loggerBuilder?.log();
  }

  public DEBUG(...args: Array<any>) {
    this.printServiceString();
    this.loggerBuilder = LoggerBuilder.DEBUG(...args);
    this.loggerBuilder?.log();
  }
}
