import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/music" element={<p>Music page</p>} />
        <Route path="/music/:id" element={<p>Track info page</p>} />
        <Route path="/favourites" element={<p>Favourites page</p>} />
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
}

export default App;
