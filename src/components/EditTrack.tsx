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
  Upload,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TrackFormFields, TrackModel } from "../models/music";
import { GenreModel, GenreOption } from "../models/genres";
import { musicService } from "../services/music.service";
import { useDispatch } from "react-redux";
import { setSpinner } from "../redux/spinner/spinnerSlice";
const { TextArea } = Input;

type QueryParams = {
  id: string;
};

const normFile = (e: any) => {
  return e?.file;
};

const EditTrack = () => {
  const [track, setTrack] = useState<TrackModel | null>(null);
  const navigate = useNavigate();
  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [form] = Form.useForm<TrackFormFields>();
  const { id } = useParams<QueryParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSpinner(true));
    musicService.getGenres().then((res) => {
      const items = res.data as GenreModel[];
      setGenres(
        items.map((x) => ({
          label: x.name,
          value: x.id,
        }))
      );
    });
    musicService.getTrack(id!).then((res) => {
      setTrack(res.data as TrackModel);
      form.setFieldsValue(res.data as TrackModel);
      dispatch(setSpinner(false));
    });
  }, []);

  const [selectedGenre, setSelectedGenre] = useState(1);
  const onSubmit: FormProps<TrackFormFields>["onFinish"] = (item) => {
    dispatch(setSpinner(true));
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

    musicService
      .editTrack(entity)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setSpinner(false));
          message.success("Track edited successfully!");
          navigate(-1);
        } else {
          dispatch(setSpinner(false));
          const msg = res.data.errors[Object.keys(res.data.errors)[0]][0];
          message.error(msg);
        }
      })
      .catch((error) => {
        dispatch(setSpinner(false));
        console.error("Error editing track:", error);
        message.error("An error occurred while creating the track.");
      });
  };

  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        color="default"
        variant="text"
        icon={<LeftCircleOutlined />}
      ></Button>
      <h1>Edit track</h1>
      <Form
        labelCol={{
          span: 8,
        }}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        autoComplete="off"
      >
        <Form.Item<TrackFormFields> name="id" hidden></Form.Item>
        <Form.Item<TrackFormFields> name="uploadDate" hidden></Form.Item>
        <Form.Item<TrackFormFields> name="userId" hidden></Form.Item>
        <Form.Item<TrackFormFields>
          label="Title"
          name="title"
          required
          rules={[
            {
              required: true,
              message: "Title must be at least 3 symbols long!",
              min: 3,
              max: 100,
            },
          ]}
        >
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
    </>
  );
};
export default EditTrack;
