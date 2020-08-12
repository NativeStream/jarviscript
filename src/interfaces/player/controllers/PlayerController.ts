import Player, { status } from "../models/Player";
import playerService from "../index";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import queryFetcher from "../services/QueryFetcher";
import { ServiceFetcherDTO } from "../services/QueryFetcher/ServiceFetcher";
import Song from "../models/Song";
import ytdl from "../services/YoutubeDl";

import PlaylistEmptyError from "../errors/PlaylistEmptyError";
import OutOfBoundsPlaylistError from "../errors/OutOfBoundsPlaylistError";
import player from "../index";

export default class PlayerController {
  public static async append(query: string): Promise<ServiceFetcherDTO> {
    const fetched: ServiceFetcherDTO = await queryFetcher(query);
    const playerInstance: Player = playerService.player;
    for (const song of fetched.songs) {
      playerInstance.songs.push(song);
    }
    return fetched;
  }

  public static async play(): Promise<Player> {
    const playerInstance: Player = playerService.player;
    const index = playerInstance.index;
    let song: Song = playerInstance.songs[index];

    if (playerInstance.songs.length == 0) throw new PlaylistEmptyError();

    if (!song.stream_url) song.stream_url = await this.loadStreamURL(song);

    if (playerInstance.status == status.PAUSED)
      await playerService.globalInstance.play(song.stream_url);
    else if (playerInstance.status == status.STOPED)
      await playerService.globalInstance.replaceSongAndPlay(song.stream_url);

    playerInstance.setStatusPlaying();
    return playerInstance;
  }

  public static async pause(): Promise<Player> {
    const playerInstance: Player = playerService.player;

    await playerService.globalInstance.pause();

    playerInstance.setStatusPaused();
    return playerInstance;
  }

  public static async next(): Promise<Player> {
    const playerInstance: Player = playerService.player;
    const qtd = playerInstance.songs.length;
    const index = playerInstance.index;

    if (index >= qtd - 1) throw new OutOfBoundsPlaylistError();

    playerInstance.index++;

    playerInstance.setStatusStoped();

    return await this.play();
  }

  public static async previous(): Promise<Player> {
    const playerInstance: Player = playerService.player;
    const index = playerInstance.index;

    if (index <= 0) throw new OutOfBoundsPlaylistError();

    playerInstance.index--;

    playerInstance.setStatusStoped();

    return await this.play();
  }

  public static async stop(): Promise<Player> {
    const playerInstance: Player = playerService.player;
    playerInstance.setStatusStoped();
    playerInstance.index = 0;

    playerService.globalInstance.pause();

    return playerInstance;
  }

  public static async clear(): Promise<Player> {
    const playerInstance: Player = playerService.player;
    playerInstance.songs = [];
    return await this.stop();
  }

  public static async goto(newIndex: number): Promise<Player> {
    const playerInstance: Player = playerService.player;
    const qtd = playerInstance.songs.length;

    if (newIndex < 0 || newIndex >= qtd) throw new OutOfBoundsPlaylistError();

    playerInstance.index = newIndex;

    playerInstance.setStatusStoped();

    return await this.play();
  }

  public static SendPlaylists(): Player {
    return playerService.player;
  }

  public static async LoadPlaylist() {}

  private static async loadStreamURL(song: Song): Promise<string> {
    // if (song.youtube_url){
    const result = await ytdl.getInfoFromUrl(song.youtube_url);
    return result.results[0].audio_stream_url;
    // }
  }
  private static async preloadStreamURLs() {}
}
