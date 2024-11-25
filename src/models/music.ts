import { PlaylistModel } from "./playlists";

export interface TrackModel {
  id: number;
  title: string;
  description?: string;
  trackUrl: string;
  imgUrl: string;
  isPublic: boolean;
  isArchived: boolean;
  additionalTags?: string;
  uploadDate: Date;
  artistName?: string;
  genreId: number;
  genreName?: string;
  userId?: string;
  userName?: string;
  playlists?: PlaylistModel[];
}

export type TrackFormFields = {
  id?: number;
  uploadDate?: Date;
  title: string;
  description?: string | null;
  track: File;
  image: File;
  isPublic: boolean;
  isArchived: boolean;
  additionalTags?: string;
  artistName?: string;
  genreId: number;
  userId: string;
};
