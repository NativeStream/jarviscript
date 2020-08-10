import Song from "../../models/Song";

interface IServiceFetcherDTO {
  qtd_added: number;
  playlist_name?: string;
  service_name: string;
  songs: Array<Song>;
}

export class ServiceFetcherDTO implements IServiceFetcherDTO {
  qtd_added: number;
  playlist_name?: string;
  service_name: string;
  songs: Array<Song>;

  constructor(iServiceFetcherDTO: IServiceFetcherDTO) {
    this.qtd_added = iServiceFetcherDTO.qtd_added;
    this.playlist_name = iServiceFetcherDTO.playlist_name;
    this.service_name = iServiceFetcherDTO.service_name;
    this.songs = iServiceFetcherDTO.songs;
  }
}

export interface IServiceFetcher {
  query: string;
  songs?: Array<Song>;
  check(): Boolean;
  fetch(): Promise<Array<Song>>;
}

export default abstract class ServiceFetcher {
  public abstract query: string;
  public abstract songs: Array<Song>;
  public abstract serviceName: string;

  abstract check(): Boolean;

  abstract fetch(): Promise<ServiceFetcherDTO>;

  load(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
