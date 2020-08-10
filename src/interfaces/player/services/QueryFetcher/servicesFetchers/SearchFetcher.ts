import ServiceFetcher from "../ServiceFetcher";
import Song from "../../../models/Song";
import request from "request";
import { ServiceFetcherDTO } from "../ServiceFetcher";

class SearchFetcher extends ServiceFetcher {
  public serviceName: string = "Youtube Search";
  public query: string;
  public songs: Song[];

  constructor(query: string) {
    super();
    this.query = query;
    this.songs = [];
  }

  check(): Boolean {
    return true;
  }

  async fetch(): Promise<ServiceFetcherDTO> {
    await request.get(this.query);
    throw new Error("Method not implemented.");
  }
}

export default SearchFetcher;
