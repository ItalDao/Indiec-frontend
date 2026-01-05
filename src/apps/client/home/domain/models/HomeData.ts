import  type { Artist } from "./Artist";
import type { Song } from "./Song";
import type { Event } from "./Event";
import type { Product } from "./Product";

export interface HomeData {
  featuredArtists: Artist[];
  trendingSongs: Song[];
  upcomingEvents: Event[];
  recommendedProducts: Product[];
}
