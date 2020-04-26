import {EntertainmentItem, OMDbAPISearchRecord} from "../types/Types";

export const OMDbItemToCommon = (item: OMDbAPISearchRecord): EntertainmentItem => {
  return {
    imageURL: item.Poster,
    title: item.Title,
    type: item.Type
  }
};
