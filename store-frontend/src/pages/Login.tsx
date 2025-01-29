/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';

import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import PHInput from '../components/form/PHInput';

import { useLoginMutation } from '../redux/services/auth/auth';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/services/auth/authSlice';
import PHForm from '../components/form/PHForm';
import { toast, Toaster } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {

    const toastId = toast.loading('login...');
    console.log(toastId)

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) ;
      console.log(res.data.accessToken)

      dispatch(setUser({ user: user, token: res.data.accessToken }));

    
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (err) {
      toast.error('Invalid login credentials', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="email" label="Email " />
        <PHInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>

      <Toaster richColors/>

    </Row>
  );
};

export default Login;
