import Player, { status } from "../models/Player";
import playerService from "../index";
import queryFetcher from "../services/QueryFetcher";
import { ServiceFetcherDTO } from "../services/QueryFetcher/ServiceFetcher";
import Song from "../models/Song";

import StreamUrlUtils from "../utils/StreamUrlUtils";

import PlaylistEmptyError from "../errors/PlaylistEmptyError";
import OutOfBoundsPlaylistError from "../errors/OutOfBoundsPlaylistError";

export default class PlayerController {
  public static async append(query: string): Promise<ServiceFetcherDTO> {
    const fetched: ServiceFetcherDTO = await queryFetcher(query);
    const playerInstance: Player = playerService.player;
    for (const song of fetched.songs) {
      playerInstance.songs.push(song);
    }
    StreamUrlUtils.preloadStreamURLs();
    return fetched;
  }

  public static async play(): Promise<Player> {
    const playerInstance: Player = playerService.player;

    const index = playerInstance.index;
    let song: Song = playerInstance.songs[index];

    if (playerInstance.songs.length == 0) throw new PlaylistEmptyError();

    const streamUrl = await StreamUrlUtils.loadStreamUrl(song);

    if (playerInstance.status == status.PAUSED)
      await playerService.getGlobalInstance().play(streamUrl);
    else if (playerInstance.status == status.STOPED)
      await playerService.getGlobalInstance().replaceSongAndPlay(streamUrl);

    playerInstance.setStatusPlaying();
    return playerInstance;
  }

  public static async pause(): Promise<Player> {
    const playerInstance: Player = playerService.player;

    await playerService.getGlobalInstance().pause();

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

    playerService.getGlobalInstance().pause();

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
}
