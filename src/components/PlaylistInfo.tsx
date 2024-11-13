import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrlService } from "../services/server.url.service";
import { PlaylistModel } from "../models/playlists";
import { playlistsService } from "../services/playlists.service";

type Params = {
  id: string;
};

export default function PlaylistInfo() {
  const [item, setItem] = useState<PlaylistModel | null>(null);
  const { id } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    playlistsService.getPlaylist(id!).then((res) => {
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
        <div>
          <Flex style={{ padding: "16px" }}>
            <Image
              style={{ borderRadius: "5px" }}
              width={300}
              src={serverUrlService.getUrl() + item.imgUrl}
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
