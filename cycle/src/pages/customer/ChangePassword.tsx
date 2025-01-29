/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd"
import PHForm from "../../components/form/PHForm"
import PHInput from "../../components/form/PHInput"
import { toast, Toaster } from "sonner"
import { useChangePasswordMutation } from "../../redux/services/auth/auth"
import { setUser } from "../../redux/services/auth/authSlice"
import { useAppDispatch } from "../../redux/hooks"
import { FieldValues } from "react-hook-form"
import Header from "../../components/pages/Header"

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [changePassword, ] = useChangePasswordMutation();
  console.log(changePassword);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Loading...');


    try {
      const userInfo = {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      };
      const res = await changePassword(userInfo).unwrap();
      console.log(res);
      dispatch(setUser({ user: res.user, token: res.token }));
      toast.success('Password Updated', { id: toastId, duration:5000 });
    } catch (err) {
      toast.error('Password not match', { id: toastId, duration:2000 });
    }
  }
  return (
    <div>
      <Header/>
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
    <PHForm onSubmit={onSubmit} >
      <PHInput type="text" name="oldPassword" label="Old Password" />
      <PHInput type="text" name="newPassword" label="New Password" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
    <Toaster richColors/>
  </Row>
  </div>
  )
}

export default ChangePassword
