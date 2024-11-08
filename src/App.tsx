import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout";
import MusicTable from "./components/MusicTable";
import TrackInfo from "./components/TrackInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/music" element={<MusicTable />} />
        <Route path="/music/:id" element={<TrackInfo />} />
        <Route path="/favourites" element={<p>Favourites page</p>} />
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
}

export default App;
