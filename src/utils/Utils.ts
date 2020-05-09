import {EntertainmentItem, OMDbProvider, GiantBombProvider} from "../types/Types";

export const OMDbItemToCommon = (item: OMDbProvider.OMDbAPISearchRecord): EntertainmentItem => {
  return {
    id: `omdb-${item.imdbID}`,
    imageURL: item.Poster,
    title: item.Title,
    type: item.Type
  }
};

export const GiantBombItemToCommon = (item: GiantBombProvider.Result): EntertainmentItem => {
  return {
    id: `giant-bomb-${item.id}`,
    imageURL: item.image.medium_url,
    title: item.name,
    type: 'game',
  }
};
