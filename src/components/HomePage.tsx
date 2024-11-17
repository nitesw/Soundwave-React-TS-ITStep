import { useEffect, useState } from "react";
import { TrackModel } from "../models/music";
import { musicService } from "../services/music.service";
import { Spin } from "antd";
import HomePageTrack from "./HomePageTrack";

const HomePage: React.FC = () => {
  const [music, setMusic] = useState<TrackModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    musicService.getAll().then((res) => {
      setMusic(res.data as TrackModel[]);
      console.log(res.data);
    });
    setLoading(false);
  }, []);

  return (
    <Spin spinning={loading}>
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
        <h4 style={{ margin: "0", color: "gray", fontWeight: "normal" }}>
          Here you can see some tracks as a recommendations!
        </h4>
        <div
          style={{
            padding: "20px",
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
      </div>
    </Spin>
  );
};

export default HomePage;
