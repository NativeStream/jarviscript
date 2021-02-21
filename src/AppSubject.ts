import { LoggerBuilder } from './logs/LoggerBuilder';
import { EventBus } from './resources/EventBus';
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

  public async notify<T = any>(eventBus: EventBus<T>) {
    LoggerBuilder.INFO("Recived: ", { event: eventBus.event }).log();
    for (let observer of this.observers) {
      if (observer.event === eventBus.event) {
        observer.callback(eventBus);
      }
    }
  }
}
