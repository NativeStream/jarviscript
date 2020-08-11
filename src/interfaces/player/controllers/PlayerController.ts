import Player, { status } from "../models/Player";
import app from "../../../app";
import playerService from "../index";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import queryFetcher from "../services/QueryFetcher";
import { ServiceFetcherDTO } from "../services/QueryFetcher/ServiceFetcher";
import events from "../events";
import Song from "../models/Song";
import ytdl from "../services/YoutubeDl";

export default class PlayerController {
  public static async append(query: string) {
    const fetched: ServiceFetcherDTO = await queryFetcher(query);
    const playerInstance: Player = playerService.player;
    for (const song of fetched.songs) {
      playerInstance.songs.push(song);
    }
    return fetched;
    app.notify(events.PLAYER_QUERY_ADDED, { data: fetched });
    // LoggerBuilder.DEBUG(fetched);
  }

  public static async play() {
    const playerInstance: Player = playerService.player;
    const index = playerInstance.index;
    let song: Song = playerInstance.songs[index];

    if (playerInstance.songs.length == 0)
      return app.notify(events.PLAYER_EMPTY_PLAYLIST);

    if (!song || playerInstance.status == status.STOPED) {
      playerInstance.index = 0;
      song = playerInstance.songs[0];
    }

    if (!song.stream_url) song.stream_url = await this.loadStreamURL(song);
    await playerService.globalInstance.play(song.stream_url);

    playerInstance.setStatusPlaying();
    return playerInstance;
  }

  public static async pause() {
    const playerInstance: Player = playerService.player;

    await playerService.globalInstance.pause();

    playerInstance.setStatusPaused();
    return playerInstance;
  }

  public static async next() {}
  public static async previous() {}
  public static async clear() {}
  public static async goto() {}
  public static async LoadPlaylist() {}
  public static async SendPlaylists() {}

  private static async loadStreamURL(song: Song): Promise<string> {
    // if (song.youtube_url){
    const result = await ytdl.getInfoFromUrl(song.youtube_url);
    return result.results[0].audio_stream_url;
    // }
  }
  private static async preloadStreamURLs() {}
}
