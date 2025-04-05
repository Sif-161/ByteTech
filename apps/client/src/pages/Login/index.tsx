import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { AuthService } from "../../services/authService";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './styles.css';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await AuthService.login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='container'>
      <img src={logo} alt="Logo" />
      <div className='container-content'>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
            style={{ marginBottom: '16px' }}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lembre de mim</Checkbox>
              </Form.Item>
              <a href="">Esqueceu sua senha</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
            ou <Link to={'/register'}>Cadastre-se agora!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;