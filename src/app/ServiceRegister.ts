import { Service } from "./";

import websocket from "../endpoints/websocket";
import whatsapp from "../endpoints/whatsapp";
import player from "../interfaces/player";
import database from "../interfaces/database";

const services: Array<Service> = [/*database,*/ whatsapp, websocket, player];

export default services;
