import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout";
import MusicTable from "./components/MusicTable";
import TrackInfo from "./components/TrackInfo";
import CreateTrack from "./components/CreateTrack";
import EditTrack from "./components/EditTrack";
import PlaylistsTable from "./components/PlaylistsTable";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CreatePlaylist from "./components/CreatePlaylist";
import PlaylistInfo from "./components/PlaylistInfo";
import EditPlaylist from "./components/EditPlaylist";
import UsersTable from "./components/UsersTable";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/music" element={<MusicTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/playlists" element={<PlaylistsTable />} />
        <Route path="/playlists/create" element={<CreatePlaylist />} />
        <Route path="/playlists/:id" element={<PlaylistInfo />} />
        <Route path="/playlists/edit/:id" element={<EditPlaylist />} />
        <Route path="/music/:id" element={<TrackInfo />} />
        <Route path="/music/edit/:id" element={<EditTrack />} />
        <Route path="/music/create" element={<CreateTrack />} />
        <Route path="/favourites" element={<p>Favourites page</p>} />
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
}

export default App;
