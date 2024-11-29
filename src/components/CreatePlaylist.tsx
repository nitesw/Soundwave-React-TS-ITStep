import { LeftCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, message, Space, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { PlaylistFormFields } from "../models/playlists";
import { playlistsService } from "../services/playlists.service";
import { tokenService } from "../services/token.service";
import { useDispatch } from "react-redux";
import { setSpinner } from "../redux/spinner/spinnerSlice";
const { TextArea } = Input;

const normFile = (e: any) => {
  return e?.file;
};

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: FormProps<PlaylistFormFields>["onFinish"] = (item) => {
    dispatch(setSpinner(true));
    console.log(item);
    const entity = new FormData();
    Object.keys(item).forEach((key) => {
      const typedKey = key as keyof PlaylistFormFields;
      const value = item[typedKey];
      if (key !== "image") {
        if (value) {
          entity.append(key, value.toString());
        } else {
          entity.append(key, "");
        }
      } else {
        if (value) entity.append(key, value as File);
        else entity.append(key, "");
      }
    });

    entity.append("userId", tokenService.getPayload()?.id as string);
    console.log(entity);

    playlistsService
      .createPlaylist(entity)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setSpinner(false));
          message.success("Playlist created successfully!");
          navigate(-1);
        } else {
          dispatch(setSpinner(false));
          const msg = res.data.errors[Object.keys(res.data.errors)[0]][0];
          message.error(msg);
        }
      })
      .catch((error) => {
        dispatch(setSpinner(false));
        console.error("Error creating playlist:", error);
        message.error("An error occurred while creating the playlist.");
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
      <h1>Create new playlist</h1>
      <Form
        labelCol={{
          span: 8,
        }}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item<PlaylistFormFields>
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

        <Form.Item<PlaylistFormFields>
          label="Image"
          name="image"
          getValueFromEvent={normFile}
          required
          rules={[
            {
              required: true,
              message: "Image is required!",
            },
          ]}
        >
          <Upload
            maxCount={1}
            accept=".pjp,.jpg,.pjpeg,.jpeg,.jfif,.png"
            beforeUpload={() => {
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item<PlaylistFormFields> label="Description" name="description">
          <TextArea
            rows={14}
            placeholder="Enter description..."
            maxLength={100}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreatePlaylist;
