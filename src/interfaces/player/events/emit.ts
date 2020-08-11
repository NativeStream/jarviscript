import { ServiceFetcherDTO } from "../services/QueryFetcher/ServiceFetcher";

enum events {
  EMIT_STATUS = "EMIT_STATUS",
  EMIT_PLAYER_QUERY_ADDED = "EMIT_PLAYER_QUERY_ADDED",
  EMIT_PLAYER_EMPTY_PLAYLIST = "EMIT_PLAYER_EMPTY_PLAYLIST",
  EMIT_PLAYER_PLAY = "EMIT_PLAYER_PLAY",
  EMIT_PLAYER_PAUSE = "EMIT_PLAYER_PAUSE",
  EMIT_PLAYER_APPEND = "EMIT_PLAYER_APPEND",
  EMIT_PLAYER_NEXT = "EMIT_PLAYER_NEXT",
  EMIT_PLAYER_PREVIOUS = "EMIT_PLAYER_PREVIOUS",
  EMIT_PLAYER_EMPTY = "EMIT_PLAYER_EMPTY",
}

export default events;