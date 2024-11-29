import { useEffect, useState } from "react";
import { TrackModel } from "../models/music";
import { musicService } from "../services/music.service";
import HomePageTrack from "./HomePageTrack";

const HomePage: React.FC = () => {
  const [music, setMusic] = useState<TrackModel[]>([]);

  const shuffleArray = (array: TrackModel[]): TrackModel[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    musicService.getAll().then((res) => {
      const publicTracks = res.data as TrackModel[];
      setMusic(shuffleArray(publicTracks.filter((x) => x.isPublic === true)));
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: "0", fontWeight: "normal" }}>
        Welcome to the Soundwave!
      </h1>
      {music.length > 0 ? (
        <h4 style={{ margin: "0", color: "gray", fontWeight: "normal" }}>
          Here you can see some tracks as a recommendations!
        </h4>
      ) : (
        <h4 style={{ margin: "0", color: "gray", fontWeight: "normal" }}>
          Sorry! As for now there is no tracks that we can recommend!
        </h4>
      )}
      {music.length > 0 ? (
        <div
          style={{
            padding: "20px",
            width: "100%",
          }}
          className="row row-cols-5"
        >
          {music.map((track: TrackModel) => {
            return track.isPublic === true ? (
              <HomePageTrack key={track.id} track={track} />
            ) : (
              ""
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
