export interface EntertainmentItem {
  id: string;
  imageURL: string;
  title: string;
  type: 'movie' | 'series' | 'book' | 'game';
}

export interface FirebaseUser {
  id: string;
}

export interface UserFirebaseDataShape {
  [id: string]: {
    watched: boolean;
    data: EntertainmentItem;
  }
}

export declare module OMDbProvider {
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
}

export declare module GiantBombProvider {
  export interface Image {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
    image_tags: string;
  }

  export interface ImageTag {
    api_detail_url: string;
    name: string;
    total: number;
  }

  export interface OriginalGameRating {
    api_detail_url: string;
    id: number;
    name: string;
  }

  export interface Platform {
    api_detail_url: string;
    id: number;
    name: string;
    site_detail_url: string;
    abbreviation: string;
  }

  export interface Result {
    aliases: string;
    api_detail_url: string;
    date_added: string;
    date_last_updated: string;
    deck: string;
    description: string;
    expected_release_day?: any;
    expected_release_month?: any;
    expected_release_quarter?: any;
    expected_release_year?: any;
    guid: string;
    id: number;
    image: Image;
    image_tags: ImageTag[];
    name: string;
    number_of_user_reviews: number;
    original_game_rating: OriginalGameRating[];
    original_release_date: string;
    platforms: Platform[];
    site_detail_url: string;
  }

  export interface GamesAPIResponse {
    error: string;
    limit: number;
    offset: number;
    number_of_page_results: number;
    number_of_total_results: number;
    status_code: number;
    results: Result[];
    version: string;
  }
}
