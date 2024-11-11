import axios from "axios";

const API = import.meta.env.VITE_MUSIC_API;
let api = axios.create({ baseURL: API });
export const musicService = {
  getAll() {
    return api.get("all");
  },
  getTrack(id: string) {
    return api.get("getTrack?id=" + id);
  },
  getGenres() {
    return api.get("genres");
  },
  deleteTrack(id: number) {
    return api.delete("delete?id=" + id);
  },
  createTrack(entity: FormData) {
    return api.post("create", entity);
  },
  editTrack(entity: FormData) {
    return api.put("edit", entity);
  },
};
