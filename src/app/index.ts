import services from "./ServiceRegister";

export interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notify(event: string, data: any): void;
}

export interface Observer {
  event: string;
  from: string;
  callback(data: any): void;
}

export interface Service {
  globalInstance: any;
  observers: Array<Observer>;
  init(): void;
}

class Application implements Subject {
  private observers: Array<Observer> = [];

  init(): void {
    for (const service of services) {
      service.init();
      for (const oberserver of service.observers) {
        this.registerObserver(oberserver);
      }
    }
  }

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }
  removeObserver(o: Observer): void {
    const index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  notify(event: string, data: any): void {
    for (const observer of this.observers) {
      if (observer.event == event) observer.callback(data);
    }
  }
}

export default new Application();
