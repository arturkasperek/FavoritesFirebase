export interface OMDbAPISearchRecord {
  Poster: string;
  Title: string;
  Type: 'movie' | 'series';
  Year: string;
  imdbID: string;
}

export interface OMDbAPIResponse {
  Response: string;
  Search?: OMDbAPISearchRecord[];
  totalResults: string;
}

export interface EntertainmentItem {
  imageURL: string;
  title: string;
  type: 'movie' | 'series' | 'book' | 'game';
}
