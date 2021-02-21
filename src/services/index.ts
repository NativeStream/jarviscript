import { AbstractService } from "../resources/Service";
import { WhatsappService } from './whatsapp/WhatsappService';
import { WebsocketService } from "./websocket/WebsocketService";

const servicesClasses = [
  WebsocketService,
  WhatsappService
];

const services: AbstractService[] = servicesClasses.map((value) => {
  return new value();
});

export default services;
