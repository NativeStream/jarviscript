import { EventBus } from './EventBus';
import { LoggerService } from "../logs/LoggerService";
import { AbstractService } from "./Service";
import { IEvent } from '../interfaces/IEvent';

const SINGLETON_KEY = Symbol();

export interface IObserverExtensor {
  _logger?: LoggerService;
  _service: AbstractService;
}

type Observer<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export interface IObserver {
  event: IEvent;
  callback(eventBus: EventBus): Promise<any>;
}

export abstract class AbstractObserver<T = any> implements IObserver {
  private extensor = (this as unknown) as IObserverExtensor;
  abstract event: IEvent;
  abstract callback(eventBus: EventBus): Promise<any>;
  public get logger() {
    return this.extensor._logger;
  }
  public get service(): T {
    return (this.extensor._service as unknown) as T;
  }
}

export function Observer() {
  return <T extends { new (...args: any[]): any }>(type: T) => {
    const extensor = class extends type implements IObserverExtensor {
      _service: AbstractService = {} as AbstractService;
      public log(data: any) {
        this.logger
          ?.INFO(`Event Recived:`, { event: this.event, data });
      }
    };

    return new Proxy(extensor, {
      construct(target: Observer<T>, argsList, newTarget) {
        const callback = target.prototype.callback;
        Object.defineProperty(target.prototype, "callback", {
          value: function () {
            this.log(arguments[0]);
            return callback.apply(this, arguments);
          },
        });

        if (target.prototype !== newTarget.prototype)
          return Reflect.construct(target, argsList, newTarget);
        if (!target[SINGLETON_KEY])
          target[SINGLETON_KEY] = Reflect.construct(
            target,
            argsList,
            newTarget
          );
        return target[SINGLETON_KEY];
      },
    });
  };
}