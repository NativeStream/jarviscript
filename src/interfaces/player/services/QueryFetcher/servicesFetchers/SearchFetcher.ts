import ServiceFetcher from "../ServiceFetcher";
import Song from "../../../models/Song";
import { ServiceFetcherDTO } from "../ServiceFetcher";
import youtube from "scrape-youtube";

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
    const response = await youtube.searchOne(this.query);
    if (response)
      return {
        qtd_added: 1,
        songs: [{ title: response.title, youtube_url: response.link }],
        service_name: this.serviceName,
      };
    throw new Error("Youtube Search Error");
  }
}

export default SearchFetcher;
