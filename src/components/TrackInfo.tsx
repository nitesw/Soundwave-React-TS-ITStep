import {
  LeftCircleOutlined,
  LinkOutlined,
  MenuOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Flex,
  message,
  Modal,
  Skeleton,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { TrackModel } from "../models/music";
import { musicService } from "../services/music.service";
import WavesurferPlayer from "@wavesurfer/react";
import { PlaylistModel } from "../models/playlists";
import { playlistsService } from "../services/playlists.service";
import { useAppSelector } from "../redux/hooks";
import { selectAccount } from "../redux/account/accountSlice";

type Params = {
  id: string;
};

export default function TrackInfo() {
  const account = useAppSelector(selectAccount);
  const [item, setItem] = useState<TrackModel | null>(null);
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [wavesurfer, setWavesurfer] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playlistsModal, setPlaylistsModal] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [isWavesurferReady, setIsWavesurferReady] = useState<boolean>(false);

  const onReady = (ws: any) => {
    console.log(playlists);
    setWavesurfer(ws);
    setIsWavesurferReady(true);
    setIsPlaying(false);
  };
  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const addToPlaylist = (playlistId: number, trackId: number) => {
    setDisabled(true);
    playlistsService.addTrackToPlaylist(playlistId, trackId).then((res) => {
      if (res.status === 200) {
        const playlist = playlists.find((x) => x.id === playlistId)!;
        playlist.tracks?.push(item!);
        setPlaylistsModal(false);
        message.success("Track added successfully!");
        setDisabled(false);
      } else {
        const msg = res.data.errors[Object.keys(res.data.errors)[0]][0];
        message.error(msg);
      }
    });
  };
  const removeFromPlaylist = (playlistId: number, trackId: number) => {
    setDisabled(true);
    playlistsService
      .removeTrackFromPlaylist(playlistId, trackId)
      .then((res) => {
        if (res.status === 200) {
          const playlist = playlists.find((x) => x.id === playlistId)!;
          playlist.tracks = playlist.tracks?.filter(
            (track) => track.id !== trackId
          );
          setPlaylistsModal(false);
          message.success("Track removed successfully!");
          setDisabled(false);
        } else {
          const msg = res.data.errors[Object.keys(res.data.errors)[0]][0];
          message.error(msg);
        }
      });
  };

  useEffect(() => {
    playlistsService.getAll().then((res) => {
      const userPlaylists = res.data as PlaylistModel[];
      setPlaylists(userPlaylists.filter((x) => x.userId === account?.id));
    });
    musicService.getTrack(id!).then((res) => {
      setItem(res.data as TrackModel);
    });
  }, []);

  function timeAgo(date: Date) {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      return interval === 1 ? "1 week ago" : `${interval} weeks ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }
    return "just now";
  }

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        color="default"
        variant="text"
        icon={<LeftCircleOutlined />}
      ></Button>
      {item ? (
        item.isPublic === true ? (
          <Flex vertical>
            <Flex style={{ padding: "16px" }}>
              <img
                style={{ borderRadius: "6px", width: "300px" }}
                className="square-image"
                src={item.imgUrl}
                alt={item.title}
                draggable="false"
              />
              <div style={{ marginLeft: "16px", width: "100%" }}>
                <Flex
                  vertical
                  justify="space-between"
                  style={{ height: "100%" }}
                >
                  <Flex justify="space-between">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Button
                        icon={
                          !isPlaying ? (
                            <PlayCircleOutlined />
                          ) : (
                            <PauseCircleOutlined />
                          )
                        }
                        onClick={onPlayPause}
                        disabled={!isWavesurferReady}
                      ></Button>
                      <div>
                        <h2 style={{ margin: "0", fontWeight: "normal" }}>
                          {item.title}
                        </h2>
                        <h3 style={{ margin: "0", fontWeight: "normal" }}>
                          {item.userName}
                        </h3>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection: "column",
                      }}
                    >
                      <h3 style={{ margin: "0", fontWeight: "normal" }}>
                        {timeAgo(item.uploadDate)}
                      </h3>
                      <h2
                        style={{
                          margin: "0",
                          fontWeight: "normal",
                        }}
                      >
                        <Tag
                          style={{
                            margin: "0",
                            fontSize: "16px",
                            padding: "1px 7px 1px 7px",
                          }}
                        >
                          <span style={{ marginRight: "5px" }}>#</span>
                          {item.genreName}
                        </Tag>
                      </h2>
                    </div>
                  </Flex>
                  <div>
                    {!isWavesurferReady ? (
                      <Skeleton.Input size="large" active />
                    ) : (
                      ""
                    )}
                    <WavesurferPlayer
                      height={100}
                      waveColor="#656666"
                      progressColor="#9623bc"
                      barWidth={2}
                      url={item.trackUrl}
                      cursorWidth={0}
                      onReady={onReady}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                </Flex>
              </div>
            </Flex>
            <Flex style={{ margin: "16px" }} gap="12px">
              <ConfigProvider theme={{ token: { colorPrimary: "#404040" } }}>
                <Button
                  color="default"
                  icon={<StarOutlined />}
                  variant="outlined"
                >
                  Favourite
                </Button>
                <Button
                  color="default"
                  icon={<LinkOutlined />}
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(location.href);
                    message.success("Successfully copied!");
                  }}
                >
                  Copy link
                </Button>
                <Button
                  color="default"
                  icon={<MenuOutlined />}
                  variant="outlined"
                  onClick={() => setPlaylistsModal(true)}
                >
                  Add to playlist
                </Button>
                <Modal
                  title="Available playlists"
                  open={playlistsModal}
                  onCancel={() => setPlaylistsModal(false)}
                  footer={null}
                >
                  {playlists.length > 0 ? (
                    playlists.map((playlist) => {
                      return (
                        <Flex
                          key={playlist.id}
                          align="center"
                          style={{ marginTop: "20px" }}
                          justify="space-between"
                        >
                          <Flex>
                            <img
                              className="square-image"
                              style={{ height: "50px", width: "50px" }}
                              src={playlist.imgUrl}
                              alt={playlist.title}
                            />
                            <Flex vertical style={{ marginLeft: "15px" }}>
                              <Link
                                to={"/playlists/" + playlist.id}
                                style={{ fontWeight: "normal" }}
                              >
                                <h4 className="page-component-title">
                                  {playlist.title}
                                </h4>
                              </Link>
                              <div>
                                Tracks:
                                <Tag style={{ marginLeft: "5px" }}>
                                  {playlist.tracks?.length}
                                </Tag>
                              </div>
                            </Flex>
                          </Flex>
                          {playlist.tracks?.some(
                            (track) => track.id === item.id
                          ) ? (
                            <Button
                              color="default"
                              variant="outlined"
                              disabled={isDisabled}
                              onClick={() =>
                                removeFromPlaylist(playlist.id, item.id)
                              }
                            >
                              Added
                            </Button>
                          ) : (
                            <Button
                              color="default"
                              variant="outlined"
                              disabled={isDisabled}
                              onClick={() =>
                                addToPlaylist(playlist.id, item.id)
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Flex>
                      );
                    })
                  ) : (
                    <h3 style={{ fontWeight: "normal" }}>
                      You haven't created any playlists yet.
                    </h3>
                  )}
                </Modal>
              </ConfigProvider>
            </Flex>
          </Flex>
        ) : item.isPublic === false &&
          item.userId !== account?.id &&
          account?.role !== "admin" ? (
          <Navigate to="/" />
        ) : (
          <Flex vertical>
            <Flex style={{ padding: "16px" }}>
              <img
                style={{ borderRadius: "6px", width: "300px" }}
                className="square-image"
                src={item.imgUrl}
                alt={item.title}
                draggable="false"
              />
              <div style={{ marginLeft: "16px", width: "100%" }}>
                <Flex
                  vertical
                  justify="space-between"
                  style={{ height: "100%" }}
                >
                  <Flex justify="space-between">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Button
                        icon={
                          !isPlaying ? (
                            <PlayCircleOutlined />
                          ) : (
                            <PauseCircleOutlined />
                          )
                        }
                        onClick={onPlayPause}
                        disabled={!isWavesurferReady}
                      ></Button>
                      <div>
                        <h2 style={{ margin: "0", fontWeight: "normal" }}>
                          {item.title}
                        </h2>
                        <h3 style={{ margin: "0", fontWeight: "normal" }}>
                          {item.userName}
                        </h3>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection: "column",
                      }}
                    >
                      <h3 style={{ margin: "0", fontWeight: "normal" }}>
                        {timeAgo(item.uploadDate)}
                      </h3>
                      <h2
                        style={{
                          margin: "0",
                          fontWeight: "normal",
                        }}
                      >
                        <Tag
                          style={{
                            margin: "0",
                            fontSize: "16px",
                            padding: "1px 7px 1px 7px",
                          }}
                        >
                          <span style={{ marginRight: "5px" }}>#</span>
                          {item.genreName}
                        </Tag>
                      </h2>
                    </div>
                  </Flex>
                  <div>
                    {!isWavesurferReady ? (
                      <Skeleton.Input size="large" active />
                    ) : (
                      ""
                    )}
                    <WavesurferPlayer
                      height={100}
                      waveColor="#656666"
                      progressColor="#9623bc"
                      barWidth={2}
                      url={item.trackUrl}
                      cursorWidth={0}
                      onReady={onReady}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                </Flex>
              </div>
            </Flex>
            <Flex style={{ margin: "16px" }} gap="12px">
              <ConfigProvider theme={{ token: { colorPrimary: "#404040" } }}>
                <Button
                  color="default"
                  icon={<StarOutlined />}
                  variant="outlined"
                >
                  Favourite
                </Button>
                <Button
                  color="default"
                  icon={<LinkOutlined />}
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(location.href);
                    message.success("Successfully copied!");
                  }}
                >
                  Copy link
                </Button>
                <Button
                  color="default"
                  icon={<MenuOutlined />}
                  variant="outlined"
                  onClick={() => setPlaylistsModal(true)}
                >
                  Add to playlist
                </Button>
                <Modal
                  title="Available playlists"
                  open={playlistsModal}
                  onCancel={() => setPlaylistsModal(false)}
                  footer={null}
                >
                  {playlists.length > 0 ? (
                    playlists.map((playlist) => {
                      return (
                        <Flex
                          key={playlist.id}
                          align="center"
                          style={{ marginTop: "20px" }}
                          justify="space-between"
                        >
                          <Flex>
                            <img
                              className="square-image"
                              style={{ height: "50px", width: "50px" }}
                              src={playlist.imgUrl}
                              alt={playlist.title}
                            />
                            <Flex vertical style={{ marginLeft: "15px" }}>
                              <Link
                                to={"/playlists/" + playlist.id}
                                style={{ fontWeight: "normal" }}
                              >
                                <h4 className="page-component-title">
                                  {playlist.title}
                                </h4>
                              </Link>
                              <div>
                                Tracks:
                                <Tag style={{ marginLeft: "5px" }}>
                                  {playlist.tracks?.length}
                                </Tag>
                              </div>
                            </Flex>
                          </Flex>
                          {playlist.tracks?.some(
                            (track) => track.id === item.id
                          ) ? (
                            <Button
                              color="default"
                              variant="outlined"
                              disabled={isDisabled}
                              onClick={() =>
                                removeFromPlaylist(playlist.id, item.id)
                              }
                            >
                              Added
                            </Button>
                          ) : (
                            <Button
                              color="default"
                              variant="outlined"
                              disabled={isDisabled}
                              onClick={() =>
                                addToPlaylist(playlist.id, item.id)
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Flex>
                      );
                    })
                  ) : (
                    <h3 style={{ fontWeight: "normal" }}>
                      You haven't created any playlists yet.
                    </h3>
                  )}
                </Modal>
              </ConfigProvider>
            </Flex>
          </Flex>
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
