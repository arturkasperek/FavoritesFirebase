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

export const getImage = (imageUrl: string): string => {
  return /\/\//.test(imageUrl) ? imageUrl : 'https://puffinplastics-static.myshopblocks.com/images/2020/02/contain/2048x2048/170b8d938f75e29c8da9c15b1b663050.jpg';
}
