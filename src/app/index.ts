import services from "./ServiceRegister";
import LoggerBuilder from "../logs/LoggerBuilder";

export interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notify(event: string, eventData): void;
}

export interface Observer {
  event: string;
  callback(eventData: EventData): void;
}

export interface Service {
  globalInstance: any;
  observers: Array<Observer>;
  serviceName: string;
  init(): Promise<void>;
}

export interface EventData {
  user?: any;
  data?: any;
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
    for (const observer of this.observers) {
      if (observer.event == event) observer.callback(eventData);
    }
  }
}

export default new Application();