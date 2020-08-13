import services from "./ServiceRegister";
import ServiceFetcher, { ServiceFetcherDTO } from "./ServiceFetcher";
import SearchFetcher from "./servicesFetchers/SearchFetcher";

async function fetcher(service: ServiceFetcher): Promise<ServiceFetcherDTO> {
  const result: ServiceFetcherDTO = await service.fetch();
  return result;
}

async function searchFetcher(query: string): Promise<ServiceFetcherDTO> {
  const searchFetcher = new SearchFetcher(query);
  const result: ServiceFetcherDTO = await searchFetcher.fetch();
  return result;
}

export default async (query: string): Promise<ServiceFetcherDTO> => {
  for (const serviceFetcher of services) {
    const service: ServiceFetcher = new serviceFetcher(query);
    if (service.check()) return await fetcher(service);
  }
  return await searchFetcher(query);
};
