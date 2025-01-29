/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown, Spin, Table, TableColumnsType, Tag, } from "antd"
import { TUsers } from "../../types/dataTypes";
import { useGetUsersDataQuery, useUpdateStatusMutation } from "../../redux/services/API/UserMangementApi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";


export type TTableData = Pick<TUsers, 'email' | 'isActive' | 'role' | 'name'>
const items = [
  {
    value: 'Active',
    label: 'ACTIVE',
    key: 'Active'
  },
  {
    value: 'Blocked',
    label: 'BLOCK',
    key: 'Blocked'
  },

]

const UsersData = () => {
  const [userId, setUserId] = useState(' ')
  const { data: UsersData, isLoading, refetch } = useGetUsersDataQuery(undefined)
  console.log(UsersData)
  const [updateStatus] = useUpdateStatusMutation()

  const tableData: TTableData[] =
    UsersData?.data?.map((user: TUsers) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })) || [];




  const handleStatus =async (data: any) => {

    const updateData = {
      id: userId,
      data: {
        status: data.key,
      },
    };

    try {
      await updateStatus(updateData).unwrap();
      refetch();
      toast.success("Successfully")

    }
    
    catch (error) {
      console.error("Failed to update status:", error);
    }

  };

  const menuProps = {
    items, onClick: handleStatus
  }

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Full name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

    },
    {
      title: 'Active',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? "green" : "red"}>
          {status === 'Active' ? "Active" : "Blocked"}
        </Tag>
      )

    },

    {
      title: 'Action',
      key: 'x',
      render: (data) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']} disabled={data.role === 'admin'}>
            <Button onClick={() => setUserId(data.id)} disabled={data.role === 'admin'}>Update</Button>

          </Dropdown>
        );
      },

    },
  ];
  if (isLoading) {
    return <div>
      <Spin size="large" />
    </div>
  }

  return (
    <div className="">
      <button className="btn btn-primary"><NavLink to="/">Home</NavLink></button>

      <Table
        className=" "
        columns={columns}
        dataSource={tableData}
        pagination={false} />


    </div>
  )


}


export default UsersData
