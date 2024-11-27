import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { PlaylistModel } from "../models/playlists";

interface ProfilePagePlaylistProps {
  playlist: PlaylistModel;
}

const ProfilePagePlaylist: React.FC<ProfilePagePlaylistProps> = ({
  playlist,
}) => {
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
        src={playlist.imgUrl}
        alt={playlist.title}
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
          <Link to={"/playlists/" + playlist.id}>
            <h3 className="page-component-title">{playlist.title}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePagePlaylist;
