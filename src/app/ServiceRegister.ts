import { Service } from "./";

import Websocket from "../endpoints/websocket";

const services: Array<Service> = [new Websocket()];

export default services;
