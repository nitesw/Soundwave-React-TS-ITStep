import { TrackModel } from "./music";

export interface PlaylistModel {
  id: number;
  title: string;
  imgUrl: string;
  description?: string;
  tracks?: TrackModel[];
  userId?: string;
  userName?: string;
}

export type PlaylistFormFields = {
  id?: number;
  title: string;
  description?: string | null;
  image: File;
  userId?: string;
  userName?: string;
};
