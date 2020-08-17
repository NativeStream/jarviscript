import services from "./ServiceRegister";
import LoggerBuilder from "../logs/LoggerBuilder";
import { IUser } from "./models/User";

export interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notify(event: string, eventData: EventData): void;
}

export interface Observer {
  event: string;
  callback(eventData?: EventData): void;
}

export interface Service {
  globalInstance?: any;
  observers: Array<Observer>;
  serviceName: string;
  init(): Promise<void>;
  getGlobalInstance(): any;
}

export interface EventData {
  user?: IUser;
  data?: any;
  event?: string;
  from: string;
}

class Application implements Subject {
  private observers: Array<Observer> = [];

  async init(): Promise<void> {
    try {
      LoggerBuilder.INFO("Initializing and regitering services observers...");
      for (const service of services) {
        LoggerBuilder.INFO(`Initializing service: ${service.serviceName}`);
        await service.init();
        if (service.observers)
          for (const oberserver of service.observers) {
            this.registerObserver(oberserver);
          }
      }
      LoggerBuilder.INFO("Intialization DONE!");
    } catch (error) {
      LoggerBuilder.ERROR("Failed on initializating services", error);
      process.exit(1);
    }
  }

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }
  removeObserver(o: Observer): void {
    const index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  notify(event: string, eventData?: EventData): void {
    LoggerBuilder.DEBUG("Notifying event: ", event);
    for (const observer of this.observers) {
      if (observer.event == event) observer.callback(eventData);
    }
  }
}

export default new Application();
