import ServiceFetcher from "../ServiceFetcher";
import Song from "../../../models/Song";
import { ServiceFetcherDTO } from "../ServiceFetcher";

class SpotifyFetcher extends ServiceFetcher {
  public serviceName: string = "Spotify";
  public query: string;
  public songs: Song[];

  constructor(query: string) {
    super();
    this.query = query;
    this.songs = [];
  }

  check(): Boolean {
    return false;
    // throw new Error("Method not implemented.");
  }
  fetch(): Promise<ServiceFetcherDTO> {
    throw new Error("Method not implemented.");
  }
}

export default SpotifyFetcher;
