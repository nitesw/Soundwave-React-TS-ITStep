import { DeleteOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Button, Flex, List, message, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { PlaylistModel } from "../models/playlists";
import { playlistsService } from "../services/playlists.service";
import { useAppSelector } from "../redux/hooks";
import { selectAccount, selectIsAuth } from "../redux/account/accountSlice";
import "../App.css";
import { useDispatch } from "react-redux";
import { setSpinner } from "../redux/spinner/spinnerSlice";
import { TrackModel } from "../models/music";

type Params = {
  id: string;
};

export default function PlaylistInfo() {
  const [item, setItem] = useState<PlaylistModel | null>(null);
  const account = useAppSelector(selectAccount);
  const isAuth = useAppSelector(selectIsAuth);
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    playlistsService.getPlaylist(id!).then((res) => {
      const playlist = res.data as PlaylistModel;
      console.log(res.data.tracks);
      setItem(playlist);
    });
  }, []);

  const removeFromPlaylist = (playlistId: number, trackId: number) => {
    dispatch(setSpinner(true));
    playlistsService
      .removeTrackFromPlaylist(playlistId, trackId)
      .then((res) => {
        if (res.status === 200) {
          if (item && item.tracks) {
            const updatedTracks = item.tracks.filter(
              (track) => track.id !== trackId
            );
            setItem({
              ...item,
              tracks: updatedTracks,
            });
          }
          message.success("Track removed successfully!");
          dispatch(setSpinner(false));
        } else {
          dispatch(setSpinner(false));
          const msg = res.data.errors[Object.keys(res.data.errors)[0]][0];
          message.error(msg);
        }
      });
  };

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        color="default"
        variant="text"
        icon={<LeftCircleOutlined />}
      ></Button>
      {item ? (
        (isAuth && item?.userId === account?.id) ||
        (isAuth && account?.role === "admin") ? (
          <Flex vertical>
            <Flex style={{ padding: "16px" }}>
              <img
                style={{ borderRadius: "6px", width: "300px" }}
                className="square-image"
                src={item.imgUrl}
                alt={item.title}
                draggable="false"
              />
              <Flex
                vertical
                style={{ marginLeft: "16px", width: "100%" }}
                justify="space-between"
              >
                <div>
                  <Flex justify="space-between">
                    <h2 style={{ margin: "0", fontWeight: "normal" }}>
                      {item.title}
                    </h2>
                    <div>
                      <h3 style={{ margin: "0", fontWeight: "normal" }}>
                        Tracks:
                        <Tag style={{ marginLeft: "5px" }}>
                          {item.tracks?.length}
                        </Tag>
                      </h3>
                    </div>
                  </Flex>
                </div>
                <Flex vertical>
                  <h1 style={{ fontWeight: "normal", margin: 0 }}>
                    Description:
                  </h1>
                  <div
                    style={{
                      marginTop: "8px",
                      minHeight: "200px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      padding: "8px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                    }}
                  >
                    {item.description ? (
                      <pre style={{ margin: "0" }}>{item.description}</pre>
                    ) : (
                      <h3 style={{ fontWeight: "normal", margin: 0 }}>
                        No description.
                      </h3>
                    )}
                  </div>
                </Flex>
              </Flex>
            </Flex>
            <Flex style={{ padding: "16px", width: "100%" }}>
              <div style={{ width: "100%" }}>
                {item.tracks?.length! > 0 ? (
                  <List itemLayout="horizontal">
                    {item.tracks!.map((track: TrackModel, index) => (
                      <List.Item key={index}>
                        <Flex justify="space-between" style={{ width: "100%" }}>
                          <Flex>
                            <img
                              className="square-image"
                              style={{ height: "50px", width: "50px" }}
                              src={track.imgUrl}
                              alt={track.title}
                            />
                            <Flex
                              vertical
                              style={{ marginLeft: "10px" }}
                              justify="center"
                            >
                              <Link
                                to={"/music/" + track.id}
                                style={{ fontWeight: "normal" }}
                              >
                                <h4 className="page-component-title">
                                  {track.title}
                                </h4>
                              </Link>
                              <h5
                                style={{
                                  margin: "0px",
                                  marginTop: "-4px",
                                  color: "gray",
                                  fontWeight: "normal",
                                }}
                              >
                                {track.userName}
                              </h5>
                            </Flex>
                          </Flex>
                          <Flex align="center">
                            <Button
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                removeFromPlaylist(item.id, track.id)
                              }
                            ></Button>
                          </Flex>
                        </Flex>
                      </List.Item>
                    ))}
                  </List>
                ) : (
                  <h1 style={{ margin: 0, fontWeight: "normal" }}>
                    You haven't added any tracks yet.
                  </h1>
                )}
              </div>
            </Flex>
          </Flex>
        ) : (
          <Navigate to="/playlists" />
        )
      ) : (
        <Flex style={{ padding: "16px" }}>
          <Skeleton.Image active style={{ width: "300px", height: "300px" }} />
          <Flex
            justify="space-between"
            style={{ marginLeft: "16px", width: "100%" }}
          >
            <Skeleton.Input active />
            <Skeleton.Input active />
          </Flex>
        </Flex>
      )}
    </div>
  );
}
