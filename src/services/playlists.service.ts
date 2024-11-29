import createApiService from "./api.headers.service";

const API = import.meta.env.VITE_PLAYLISTS_API;
let api = createApiService(API);
export const playlistsService = {
  getAll() {
    return api.get("all");
  },
  getPlaylist(id: string) {
    return api.get("getPlaylist?id=" + id);
  },
  deletePlaylist(id: number) {
    return api.delete("delete?id=" + id);
  },
  createPlaylist(entity: FormData) {
    return api.post("create", entity);
  },
  editPlaylist(entity: FormData) {
    return api.put("edit", entity);
  },
  addTrackToPlaylist(playlistId: number, trackId: number) {
    return api.put(`addTrack?playlistId=${playlistId}&trackId=${trackId}`);
  },
  removeTrackFromPlaylist(playlistId: number, trackId: number) {
    return api.put(`deleteTrack?playlistId=${playlistId}&trackId=${trackId}`);
  },
};
