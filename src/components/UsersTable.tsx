import { useEffect, useState } from "react";
import { message, Select, Space, Table, TableProps } from "antd";
import { Roles, UserModel } from "../models/accounts";
import { accountsService } from "../services/accounts.service";
import { useDispatch } from "react-redux";
import { setSpinner } from "../redux/spinner/spinnerSlice";
import { useAppSelector } from "../redux/hooks";
import { selectAccount } from "../redux/account/accountSlice";

const UsersTable = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const account = useAppSelector(selectAccount);
  const dispatch = useDispatch();

  const handleChange = (userId: string, role: string) => {
    dispatch(setSpinner(true));
    accountsService.changeRole(userId, role).then((res) => {
      if (res.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role } : user
          )
        );
        dispatch(setSpinner(false));
        message.success("Role successfully changed!");
      } else {
        dispatch(setSpinner(false));
        const msg = res.data.errors[Object.keys(res.data.errors)[0]][0];
        message.error(msg);
      }
    });
  };

  const columns: TableProps<UserModel>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password Hash",
      dataIndex: "passwordHash",
      key: "passwordHash",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Select
            defaultValue={record.role}
            disabled={record.userName === "admin" || record.id === account?.id}
            placeholder="Select role"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: Roles.admin,
                label: "Admin",
                disabled: record.role === Roles.admin,
              },
              {
                value: Roles.proUser,
                label: "Pro user",
                disabled: record.role === Roles.proUser,
              },
              {
                value: Roles.user,
                label: "User",
                disabled: record.role === Roles.user,
              },
            ]}
            onChange={(value) => handleChange(record.id, value)}
          ></Select>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    accountsService.getAll().then((response) => {
      setUsers(response.data as UserModel[]);
    });
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </>
  );
};
export default UsersTable;
