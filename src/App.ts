import { SystemStart } from './services/app/types/index';
import { AppSubject } from "./AppSubject";
import { LoggerBuilder } from "./logs/LoggerBuilder";
import services from "./services";
import { EventBus } from './resources/EventBus';

export class App {
  readonly appSubject: AppSubject = AppSubject.getInstance();
  private services = services;

  public async start() {
    LoggerBuilder.DEBUG("Starting App...").log();

    LoggerBuilder.DEBUG("Registering Services and Observers...").log();
    for (const service of this.services) {
      service.init().then(() => {
        service.logger.INFO(
          "Service",
          service.serviceName,
          "initialized"
        );
        for (const observer of service.observers) {
          this.appSubject.attatch(observer);
        }
      }).catch((error) => {
        LoggerBuilder.ERROR(`Service initialization failed.`, error).log();
      });
    }

    this.emitSystemStartEvent();
  }

  private emitSystemStartEvent() {
    this.appSubject.notify<typeof SystemStart.type>(new EventBus(
      SystemStart,
      { message: "System initialized." }
    ));
  }
}
