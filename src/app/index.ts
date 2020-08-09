export interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(event: string, data: any): void;
}

export interface Observer {
  event: string;
  from: string;
  callback(data: any): void;
}

class Application implements Subject {
  private observers: Array<Observer> = [];

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }
  removeObserver(o: Observer): void {
    const index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  notifyObservers(event: string, data: any): void {
    for (const observer of this.observers) {
      if (observer.event == event) observer.callback(data);
    }
  }
}
