const serverUrl = import.meta.env.VITE_SERVER_URL;
export const serverUrlService = {
  getUrl() {
    return serverUrl;
  },
};
