import React from "react";
import { TrackModel } from "../models/music";
import "../App.css";
import { Link } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { StarOutlined } from "@ant-design/icons";

interface HomePageTrackProps {
  track: TrackModel;
}

const HomePageTrack: React.FC<HomePageTrackProps> = ({ track }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "12px",
        marginTop: "12px",
      }}
      className="col"
    >
      <img
        src={track.imgUrl}
        alt={track.title}
        className="square-image"
        draggable="false"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Link to={"music/" + track.id}>
            <h3 className="homepage-track-title">{track.title}</h3>
          </Link>
          <h4
            style={{
              margin: "0px",
              marginTop: "-4px",
              color: "gray",
              fontWeight: "normal",
            }}
          >
            {track.userName}
          </h4>
        </div>
        <ConfigProvider theme={{ token: { colorPrimary: "#fa8c16" } }}>
          <Button color="primary" variant="filled" icon={<StarOutlined />} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default HomePageTrack;
