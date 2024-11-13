import axios from "axios";

const API = import.meta.env.VITE_PLAYLISTS_API;
let api = axios.create({ baseURL: API });
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
};
