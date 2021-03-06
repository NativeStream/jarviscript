import ServiceFetcher from "../ServiceFetcher";
import Song from "../../../models/Song";
import ytdl, { YoutubeResult } from "../../YoutubeDl";
import { ServiceFetcherDTO } from "../ServiceFetcher";

class YoutubeFecther extends ServiceFetcher {
  public serviceName: string = "Youtube";
  public query: string;
  public songs: Song[];

  constructor(query: string) {
    super();
    this.query = query;
    this.songs = [];
  }

  check(): Boolean {
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    return youtubeRegex.test(this.query);
  }

  async fetch(): Promise<ServiceFetcherDTO> {
    const url = new URL(this.query);
    const result: YoutubeResult = await ytdl.getInfoFromUrl(this.query);

    const songs: Array<Song> = [];

    result.results.forEach((ytResult) => {
      songs.push({
        title: ytResult.title,
        cover: ytResult.thumbnail,
        youtube_url: `https://youtu.be/${ytResult.id}`,
        stream_url: ytResult.audio_stream_url,
      });
    });

    return new ServiceFetcherDTO({
      playlist_name: result.playlistName,
      qtd_added: songs.length,
      service_name: "Youtube",
      songs: songs,
    });
  }
}

export default YoutubeFecther;
