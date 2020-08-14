import Song from "../models/Song";
import ytdl from "../services/YoutubeDl";
import youtube from "scrape-youtube";
import playerService from "../index";
import Player from "../models/Player";
import LoggerBuilder from "../../../logs/LoggerBuilder";

export default class StreamUrlUtils {
  public static async loadStreamUrl(
    song: Song,
    preload: boolean = true
  ): Promise<string> {
    if (!song.stream_url || !this.checkStreamUrl(song.stream_url)) {
      if (!song.youtube_url) await this.youtubeFromMetadata(song);
      try {
        song.stream_url = await this.loadFromUrl(song.youtube_url || "");
      } catch (error) {
        await this.youtubeFromMetadata(song);
        song.stream_url = await this.loadFromUrl(song.youtube_url || "");
      }
      if (preload) this.preloadStreamURLs();
    }
    return song.stream_url || "";
  }

  private static async loadFromUrl(url: string): Promise<string> {
    const result = await ytdl.getInfoFromUrl(url);
    return result.results[0].audio_stream_url;
  }

  private static async youtubeFromMetadata(song: Song) {
    const title = song.title || "";
    const artist = song.artist || "";
    const search = `${title} ${artist}`;
    const response = await youtube.search(search);
    for (const result of response) {
      song.youtube_url = result.link;
      try {
        song.stream_url = await this.loadFromUrl(song.youtube_url);
        return song;
      } catch (error) {
        continue;
      }
    }
    throw new Error("Any song was found");
  }

  private static checkStreamUrl(streamUrl: string): boolean {
    return true;
  }

  public static async preloadStreamURLs() {
    const playerInstace: Player = playerService.player;
    if (!playerInstace.preLoading) {
      playerInstace.preLoading = true;
      for (const song of playerInstace.songs) {
        LoggerBuilder.DEBUG("Preloading", song.title);
        await this.loadStreamUrl(song, false);
      }
      playerInstace.preLoading = false;
    }
  }
}
