import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PlaylistModel } from "../models/playlists";
import { playlistsService } from "../services/playlists.service";
import { useAppSelector } from "../redux/hooks";
import { selectAccount, selectIsAuth } from "../redux/account/accountSlice";

type Params = {
  id: string;
};

export default function PlaylistInfo() {
  const [item, setItem] = useState<PlaylistModel | null>(null);
  const account = useAppSelector(selectAccount);
  const isAuth = useAppSelector(selectIsAuth);
  const { id } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    playlistsService.getPlaylist(id!).then((res) => {
      console.log(res.data);
      setItem(res.data as PlaylistModel);
    });
  }, []);

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
          <div>
            <Flex style={{ padding: "16px" }}>
              <img
                style={{ borderRadius: "6px", width: "300px" }}
                className="square-image"
                src={item.imgUrl}
                alt={item.title}
                draggable="false"
              />
              <div style={{ marginLeft: "16px", width: "100%" }}>
                <Flex justify="space-between">
                  <div>
                    <h2 style={{ margin: "0" }}>{item.title}</h2>
                  </div>
                  <div>
                    <h3 style={{ margin: "0" }}>
                      <Tag>{item.tracks?.length}</Tag>
                    </h3>
                  </div>
                </Flex>
              </div>
            </Flex>
          </div>
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
