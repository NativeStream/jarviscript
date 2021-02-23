import { LoggerBuilder } from './logs/LoggerBuilder';
import { AbstractEvent } from './resources/AbstractEvent';
import { AbstractObserver } from "./resources/Observer";

export class AppSubject {
  private static instance: AppSubject;
  private observers: AbstractObserver[] = [];

  private constructor() {}

  public static getInstance() {
    if (!AppSubject.instance) AppSubject.instance = new AppSubject();
    return AppSubject.instance;
  }

  public attatch(observer: AbstractObserver) {
    this.observers.push(observer);
  }

  public deattatch(observer: AbstractObserver) {
    this.observers = this.observers.filter(
      (value: AbstractObserver) => value != observer
    );
  }

  public async notify(event: AbstractEvent) {
    LoggerBuilder.INFO("Recived: ", { event: event.constructor.name }).log();
    for (let observer of this.observers) {
      if (event instanceof observer.event) {
        observer.callback(event);
      }
    }
  }
}
