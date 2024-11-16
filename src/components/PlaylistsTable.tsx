import { useEffect, useState } from "react";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { serverUrlService } from "../services/server.url.service";
import { PlaylistModel } from "../models/playlists";
import { playlistsService } from "../services/playlists.service";

const PlaylistsTable = () => {
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);

  const columns: TableProps<PlaylistModel>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "image",
      render: (_, item) => (
        <img
          height="50"
          src={item.imgUrl}
          alt={item.title}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Track Count",
      dataIndex: "tracks",
      key: "tracks",
      render: (_, item) =>
        item.tracks?.length! > 0 ? (
          <Tag color="green">{item.tracks?.length}</Tag>
        ) : (
          <Tag color="volcano">{item.tracks?.length}</Tag>
        ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/playlists/${record.id}`}>
            <Button
              color="primary"
              variant="filled"
              icon={<InfoCircleOutlined />}
            />
          </Link>
          <Link to={`/playlists/edit/${record.id}`}>
            <Button color="default" variant="filled" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Delete the playlist"
            description={`Are you sure you want to delete ${record.title}?`}
            onConfirm={() => deleteItem(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" variant="filled" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    playlistsService.getAll().then((response) => {
      setPlaylists(response.data as PlaylistModel[]);
    });
  }, []);

  const deleteItem = (id: number) => {
    playlistsService.deletePlaylist(id).then((res) => {
      if (res.status === 200) {
        setPlaylists(playlists.filter((x) => x.id !== id));
        message.success("Playlist deleted successfuly!");
      } else {
        message.error("Something went wrong!");
      }
    });
  };

  return (
    <>
      <Link to="/playlists/create">
        <Button
          color="primary"
          icon={<AppstoreAddOutlined />}
          variant="filled"
          style={{ marginBottom: "16px" }}
        >
          Create new playlist
        </Button>
      </Link>

      <Table columns={columns} dataSource={playlists} rowKey="id" />
    </>
  );
};
export default PlaylistsTable;
