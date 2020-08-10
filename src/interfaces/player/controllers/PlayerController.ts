import Player from "../models/Player";
import app from "../../../app";
import playerService from "../index";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import queryFetcher from "../services/QueryFetcher";
import { ServiceFetcherDTO } from "../services/QueryFetcher/ServiceFetcher";

export default class PlayerController {
  public static async append(query: string) {
    const fetched: ServiceFetcherDTO = await queryFetcher(query);
    const playerInstance: Player = playerService.player;
    for (const song of fetched.songs) {
      playerInstance.songs.push(song);
    }
    app.notify("PLAYER_QUERY_ADDED", { data: fetched });
    LoggerBuilder.DEBUG(fetched);
  }
}
