import { Service } from "./";

import websocket from "../endpoints/websocket";
import player from "../interfaces/player";
import database from "../interfaces/database";

const services: Array<Service> = [database, websocket, player];

export default services;
