/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd"
import PHForm from "../components/form/PHForm"
import PHInput from "../components/form/PHInput"
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { NavLink, useNavigate } from "react-router";


import { useRegisterMutation } from "../redux/services/auth/auth";
import { setUser } from "../redux/services/auth/authSlice";
import { toast, Toaster } from "sonner";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, ] = useRegisterMutation();
  console.log(register);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Loading...');


    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      console.log(res);
      dispatch(setUser({ user: res.user, token: res.token }));
      toast.success('Registered', { id: toastId, duration:5000 });
      navigate(`/login`);
    } catch (err) {
      toast.error('Registration issues', { id: toastId, duration:2000 });
    }




  };
  return (
    <div>
          <div>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit} >
        <PHInput type="text" name="name" label="Name " />
        <PHInput type="text" name="email" label="Email " />
        <PHInput type="text" name="password" label="Password" />
          <NavLink to="/login">
            <Button className="btn btn-primary mr-10">Login</Button>
          </NavLink>
        <Button htmlType="submit">Register</Button>
      </PHForm>
      <Toaster richColors/>
    </Row>
    </div>
    </div>
  )
}

export default Register
