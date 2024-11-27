import { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
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
  StarOutlined,
} from "@ant-design/icons";
import { musicService } from "../services/music.service";
import { Link } from "react-router-dom";
import { TrackModel } from "../models/music";
import "../App.css";
import { useAppSelector } from "../redux/hooks";
import { selectAccount } from "../redux/account/accountSlice";

const MusicTable = () => {
  const account = useAppSelector(selectAccount);
  const [music, setMusic] = useState<TrackModel[]>([]);

  const columns: TableProps<TrackModel>["columns"] = [
    ...(account?.role === "admin"
      ? [
          {
            title: "#",
            dataIndex: "id",
            key: "id",
          },
        ]
      : []),

    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "image",
      render: (_, item) => (
        <img
          className="square-image"
          style={{ height: "50px", width: "50px" }}
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
      title: "Visibility",
      dataIndex: "isPublic",
      key: "visibility",
      render: (text) =>
        text === true ? (
          <Tag color="green">Public</Tag>
        ) : (
          <Tag color="volcano">Private</Tag>
        ),
    },
    {
      title: "Genre",
      dataIndex: "genreName",
      key: "genre",
    },
    {
      title: "Upload Date",
      key: "uploadDate",
      dataIndex: "uploadDate",
      render: (date) => (
        <p>
          {new Date(date).getDate() < 10
            ? "0" + new Date(date).getDate()
            : new Date(date).getDate()}
          .
          {new Date(date).getMonth() + 1 < 10
            ? "0" + (new Date(date).getMonth() + 1)
            : new Date(date).getMonth() + 1}
          .{new Date(date).getFullYear()}
        </p>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/music/${record.id}`}>
            <Button
              color="primary"
              variant="filled"
              icon={<InfoCircleOutlined />}
            />
          </Link>
          <Link to={`/music/edit/${record.id}`}>
            <Button color="default" variant="filled" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Delete the track"
            description={`Are you sure you want to delete ${record.title}?`}
            onConfirm={() => deleteItem(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" variant="filled" icon={<DeleteOutlined />} />
          </Popconfirm>
          <ConfigProvider theme={{ token: { colorPrimary: "#fa8c16" } }}>
            <Button color="primary" variant="filled" icon={<StarOutlined />} />
          </ConfigProvider>
        </Space>
      ),
    },
    ...(account?.role === "admin"
      ? [
          {
            title: "Owner",
            dataIndex: "userName",
            key: "userName",
          },
        ]
      : []),
  ];

  useEffect(() => {
    musicService.getAll().then((response) => {
      if (account?.role === "admin") setMusic(response.data as TrackModel[]);
      else {
        const userTracks: TrackModel[] = response.data as TrackModel[];
        setMusic(userTracks.filter((x) => x.userId === account?.id));
      }
    });
  }, []);

  const deleteItem = (id: number) => {
    musicService.deleteTrack(id).then((res) => {
      if (res.status === 200) {
        setMusic(music.filter((x) => x.id !== id));
        message.success("Track deleted successfuly!");
      } else {
        message.error("Something went wrong!");
      }
    });
  };

  return (
    <>
      <Link to="/music/create">
        <Button
          color="primary"
          icon={<AppstoreAddOutlined />}
          variant="filled"
          style={{ marginBottom: "16px" }}
        >
          Create new track
        </Button>
      </Link>

      <Table columns={columns} dataSource={music} rowKey="id" />
    </>
  );
};
export default MusicTable;
