import { ServiceFetcherDTO } from "../services/QueryFetcher/ServiceFetcher";
import Player from "../models/Player";

export type EMIT_PLAYER_QUERY_ADDED = ServiceFetcherDTO;

export type EMIT_PLAYER_PLAY = Player;
export type EMIT_PLAYER_PAUSE = Player;
export type EMIT_PLAYER_CLEAR = Player;
export type EMIT_PLAYER_STOP = Player;
export type EMIT_PLAYER_APPEND = Player;
export type EMIT_PLAYER_NEXT = Player;
export type EMIT_PLAYER_PREVIOUS = Player;
