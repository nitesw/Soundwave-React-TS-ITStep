import { useEffect, useState } from "react";
import { Table, TableProps } from "antd";
import { UserModel } from "../models/accounts";
import { accountsService } from "../services/accounts.service";

const UsersTable = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

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
