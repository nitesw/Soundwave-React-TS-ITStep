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
import { ProtectedRoute } from "./security/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/music"
          element={
            <ProtectedRoute>
              <MusicTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <PlaylistsTable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/playlists/create"
          element={
            <ProtectedRoute>
              <CreatePlaylist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <PlaylistInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/edit/:id"
          element={
            <ProtectedRoute>
              <EditPlaylist />
            </ProtectedRoute>
          }
        />
        <Route path="/music/:id" element={<TrackInfo />} />
        <Route
          path="/music/edit/:id"
          element={
            <ProtectedRoute>
              <EditTrack />
            </ProtectedRoute>
          }
        />
        <Route
          path="/music/create"
          element={
            <ProtectedRoute>
              <CreateTrack />
            </ProtectedRoute>
          }
        />
        <Route path="/favourites" element={<p>Favourites page</p>} />
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
}

export default App;
