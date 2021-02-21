import { LoggerColors } from "../logs/LoggerColors";
import { LoggerService } from "../logs/LoggerService";
import { AbstractObserver, IObserverExtensor } from "./Observer";

const SINGLETON_KEY = Symbol();

type Service<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export abstract class AbstractService {
  public abstract init(): Promise<any>;
  private extensor = (this as unknown) as IServiceExtensor;
  get logger () {
    return this.extensor._logger;
  }

  public get serviceName() {
    return this.extensor._serviceName;
  }

  public get observers() {
    return this.extensor._observers;
  }
}

export interface IServiceExtensor {
  _serviceName: string;
  _logger: LoggerService;
  _observers: AbstractObserver[];
}

interface IServiceOptions {
  serviceName?: string;
  loggerColor?: LoggerColors;
  observers: any[];
}

export function Service(options: IServiceOptions) {
  return <T extends {new (...args: any[]): any}>(type: T) => {
    const extensor = class extends type implements IServiceExtensor {
      _serviceName: string = options?.serviceName || type.name;
      _logger: LoggerService = new LoggerService(
        this.serviceName,
        options?.loggerColor || LoggerColors.RANDOM
      );
      _observers = options.observers.map<AbstractObserver>((observer: (typeof Object)) => {
        const observerExtended = (new observer()) as IObserverExtensor;
        observerExtended._logger = this.logger;
        observerExtended._service = (this as unknown) as AbstractService;
        return (observerExtended as unknown) as AbstractObserver;
      });
    };

    return new Proxy(extensor, {
      construct(target: Service<T>, argsList, newTarget) {
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
