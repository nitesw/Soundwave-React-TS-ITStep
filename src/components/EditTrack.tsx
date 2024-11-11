import { useEffect, useState } from "react";
import { LeftCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Select,
  Space,
  Spin,
  Upload,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TrackFormFields, TrackModel } from "../models/music";
import { GenreModel, GenreOption } from "../models/genres";
const { TextArea } = Input;

type QueryParams = {
  id: string;
};

const musicApi = import.meta.env.VITE_MUSIC_API;
const normFile = (e: any) => {
  return e?.file;
};

const EditTrack = () => {
  const [track, setTrack] = useState<TrackModel | null>(null);
  const navigate = useNavigate();
  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<TrackFormFields>();
  const { id } = useParams<QueryParams>();

  useEffect(() => {
    fetch(musicApi + "genres")
      .then((res) => res.json())
      .then((data) => {
        const items = data as GenreModel[];
        setGenres(
          items.map((x) => {
            return { label: x.name, value: x.id };
          })
        );
      });

    setLoading(true);
    fetch(musicApi + "getTrack?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrack(data);
        form.setFieldsValue(data);
        setLoading(false);
      });
  }, []);

  const [selectedGenre, setSelectedGenre] = useState(1);
  const onSubmit: FormProps<TrackFormFields>["onFinish"] = (item) => {
    setLoading(true);
    console.log(item);
    const entity = new FormData();
    Object.keys(item).forEach((key) => {
      const typedKey = key as keyof TrackFormFields;
      const value = item[typedKey];
      if (key !== "image" && key !== "track") {
        if (value) {
          entity.append(key, value.toString());
        } else if (key === "isPublic") {
          entity.append(key, false.toString());
        } else if (key === "genreId") {
          entity.append(key, selectedGenre.toString());
        } else {
          entity.append(key, "");
        }
      } else {
        if (value) entity.append(key, value as File);
      }
    });

    entity.append("isArchived", false.toString());
    console.log(entity);

    fetch(musicApi + "edit", {
      method: "PUT",
      body: entity,
    }).then((res) => {
      if (res.status === 200) {
        message.success("Track edited successfully!");
        navigate(-1);
      } else {
        res.json().then((res) => {
          setLoading(false);
          const msg = res.errors[Object.keys(res.errors)[0]][0];
          message.error(msg);
        });
      }
    });
  };

  return (
    <>
      <Spin spinning={loading}>
        <Button
          onClick={() => navigate(-1)}
          color="default"
          variant="text"
          icon={<LeftCircleOutlined />}
        ></Button>
        <h1>Edit track</h1>
        <Form
          labelCol={{
            span: 6,
          }}
          style={{ width: "100%" }}
          layout="vertical"
          onFinish={onSubmit}
          form={form}
          autoComplete="off"
        >
          <Form.Item name="id" hidden></Form.Item>
          <Form.Item name="uploadDate" hidden></Form.Item>
          <Form.Item<TrackFormFields> label="Title" name="title" required>
            <Input placeholder="Enter the title..." maxLength={100} />
          </Form.Item>

          <div style={{ display: "flex", width: "100%", gap: "16px" }}>
            <Form.Item<TrackFormFields>
              label="Image"
              name="image"
              style={{ width: "100%" }}
              getValueFromEvent={normFile}
              required
            >
              <Upload
                maxCount={1}
                style={{ width: "100%" }}
                accept=".pjp,.jpg,.pjpeg,.jpeg,.jfif,.png"
                beforeUpload={() => {
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item<TrackFormFields>
              label="Track"
              name="track"
              style={{ width: "100%" }}
              getValueFromEvent={normFile}
              required
            >
              <Upload
                maxCount={1}
                style={{ width: "100%" }}
                accept=".mp3,.wav"
                beforeUpload={() => {
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div style={{ display: "flex", width: "100%", gap: "16px" }}>
            <Form.Item<TrackFormFields>
              label="Genre"
              name="genreId"
              required
              style={{ width: "100%" }}
            >
              <Select
                options={genres}
                defaultValue={selectedGenre}
                onChange={(value) => {
                  setSelectedGenre(value);
                }}
              ></Select>
            </Form.Item>

            <Form.Item<TrackFormFields>
              label="Additional tags"
              name="additionalTags"
              style={{ width: "100%" }}
            >
              <Input placeholder="Enter additional tags..." maxLength={40} />
            </Form.Item>
            <Form.Item<TrackFormFields>
              label="Artist"
              name="artistName"
              style={{ width: "100%" }}
            >
              <Input placeholder="Enter artist name..." maxLength={20} />
            </Form.Item>
          </div>

          <Form.Item<TrackFormFields> label="Description" name="description">
            <TextArea
              rows={8}
              placeholder="Enter description..."
              maxLength={100}
            />
          </Form.Item>

          <Form.Item<TrackFormFields> name="isPublic" valuePropName="checked">
            <Checkbox>Public</Checkbox>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="default"
                onClick={() => {
                  if (track) {
                    form.setFieldsValue(track);
                  }
                }}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
export default EditTrack;
