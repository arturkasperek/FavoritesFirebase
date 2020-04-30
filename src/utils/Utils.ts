import {EntertainmentItem, OMDbProvider, GiantBombProvider} from "../types/Types";

export const OMDbItemToCommon = (item: OMDbProvider.OMDbAPISearchRecord): EntertainmentItem => {
  return {
    imageURL: item.Poster,
    title: item.Title,
    type: item.Type
  }
};

export const GiantBombItemToCommon = (item: GiantBombProvider.Result): EntertainmentItem => {
  return {
    imageURL: item.image.medium_url,
    title: item.name,
    type: 'game',
  }
};
