import { useEffect, useState } from "react";
import { accountsService } from "../services/accounts.service";
import { useAppSelector } from "../redux/hooks";
import { clear, selectAccount } from "../redux/account/accountSlice";
import { UserModel } from "../models/accounts";
import { Button, Flex, message, Segmented, Skeleton, Tag } from "antd";
import { LeftCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TrackModel } from "../models/music";
import { musicService } from "../services/music.service";
import { playlistsService } from "../services/playlists.service";
import { PlaylistModel } from "../models/playlists";
import ProfilePageTrack from "./ProfilePageTrack";
import ProfilePagePlaylist from "./ProfilePagePlaylist";

const Profile = () => {
  const account = useAppSelector(selectAccount);
  const [user, setUser] = useState<UserModel | null>(null);
  const [tracks, setTracks] = useState<TrackModel[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<
    "Tracks" | "Playlists"
  >("Tracks");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    accountsService.get(account?.id!).then((res) => {
      setUser(res.data as UserModel);
      console.log(res.data as UserModel);
    });
    musicService.getAll().then((res) => {
      const userTracks = res.data as TrackModel[];
      setTracks(userTracks.filter((x) => x.userId === account?.id));
    });
    playlistsService.getAll().then((res) => {
      const userPlaylists = res.data as PlaylistModel[];
      setPlaylists(userPlaylists.filter((x) => x.userId === account?.id));
    });
  }, []);

  const logout = () => {
    accountsService.logout();
    dispatch(clear());
    message.success("Successfully logged out!");
  };

  return (
    <>
      {user ? (
        <Flex vertical style={{ height: "100%" }}>
          <Button
            color="default"
            variant="text"
            icon={<LeftCircleOutlined />}
            onClick={() => {
              navigate(-1);
            }}
          ></Button>
          <div>
            <h1 style={{ fontWeight: "normal", textAlign: "center" }}>
              Profile
            </h1>
          </div>
          <Flex
            justify="space-between"
            align="flex-start"
            style={{ marginTop: "20px" }}
          >
            <div>
              <h2 style={{ fontWeight: "normal", marginTop: "0" }}>
                Username:{" "}
                <span style={{ fontWeight: "bold" }}>{user?.userName}</span>
              </h2>
              <h2 style={{ fontWeight: "normal" }}>
                Email: <span style={{ fontWeight: "bold" }}>{user?.email}</span>
              </h2>
            </div>
            <Flex align="center">
              <h2 style={{ margin: "0" }}>Role:</h2>
              <div>
                <Tag
                  color={
                    account?.role === "pro"
                      ? "purple"
                      : account?.role === "admin"
                      ? "gold"
                      : "blue"
                  }
                  style={{ marginLeft: "10px" }}
                >
                  {account?.role?.toUpperCase()}
                </Tag>
              </div>
            </Flex>
          </Flex>
          <Flex flex={1} style={{ marginTop: "20px" }} vertical>
            <div style={{ width: "100%" }}>
              <Segmented
                options={["Tracks", "Playlists"]}
                block
                onChange={setSelectedSegment}
              />
              {selectedSegment === "Tracks" ? (
                tracks.length > 0 ? (
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="row row-cols-5"
                  >
                    {tracks.map((track: TrackModel) => {
                      return <ProfilePageTrack key={track.id} track={track} />;
                    })}
                  </div>
                ) : (
                  <h2 style={{ marginTop: "10px", fontWeight: "normal" }}>
                    You haven't uploaded any tracks yet.
                  </h2>
                )
              ) : playlists.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                  }}
                  className="row row-cols-5"
                >
                  {playlists.map((playlist: PlaylistModel) => {
                    return (
                      <ProfilePagePlaylist
                        key={playlist.id}
                        playlist={playlist}
                      />
                    );
                  })}
                </div>
              ) : (
                <h2 style={{ marginTop: "10px", fontWeight: "normal" }}>
                  You haven't created any playlists yet.
                </h2>
              )}
            </div>
          </Flex>
          <Flex justify="flex-end">
            <Button icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex vertical>
          <Button
            icon={<LeftCircleOutlined />}
            onClick={() => {
              navigate(-1);
            }}
          ></Button>
          <Flex justify="center">
            <Skeleton.Input active size="large" />
          </Flex>
          <Flex vertical style={{ marginTop: "50px", width: "100%" }}>
            <Flex style={{ width: "100%" }}>
              <Skeleton.Input active style={{ marginRight: "10px" }} />
              <Skeleton active paragraph={{ rows: 0 }} />
            </Flex>
            <Flex style={{ marginTop: "16px", width: "100%" }}>
              <Skeleton.Input active style={{ marginRight: "10px" }} />
              <Skeleton active paragraph={{ rows: 0 }} />
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Profile;
