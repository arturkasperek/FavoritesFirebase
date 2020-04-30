import {EntertainmentItem, GiantBombProvider, OMDbProvider} from "../types/Types";
import {GiantBombItemToCommon, OMDbItemToCommon} from "../utils/Utils";

export default class APIService {
  static async getDataFromOMDbAPI(searchVal: string): Promise<EntertainmentItem[]> {
    const resp = await fetch(
      `http://www.omdbapi.com/?apikey=abf71dbc&s=${searchVal}`,
    );
    const data = (await resp.json()) as OMDbProvider.OMDbAPIResponse;

    if ( data.Search ) {
      return data.Search.map(OMDbItemToCommon);
    } else {
      return [];
    }
  }

  static async getDataFromGiantBomb(searchVal: string): Promise<EntertainmentItem[]> {
    const resp = await fetch(
      `https://www.giantbomb.com/api/games/?api_key=6f0695b75928be9d78ceefeafe86ab45c050ad11&format=json&filter=name:${searchVal}`,
      {
        method: 'GET',
      }
    );
    const data = (await resp.json()) as GiantBombProvider.GamesAPIResponse;

    return data.results.map(GiantBombItemToCommon);
  }
}
