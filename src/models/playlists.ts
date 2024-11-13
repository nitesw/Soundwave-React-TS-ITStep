import { TrackModel } from "./music";

export interface PlaylistModel {
  id: number;
  title: string;
  imgUrl: string;
  description?: string;
  tracks?: TrackModel[];
  userId?: string;
}

export type PlaylistFormFields = {
  title: string;
  description?: string | null;
  image: File;
  userId?: string;
};
