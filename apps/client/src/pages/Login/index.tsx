import React from 'react';
import { useState } from 'react';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import './styles.css';
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    console.log('Form Values:', values);
    setLoading(true);
    try {
      //Autenticação com Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        values.email, 
        values.password
      );
      // token do firebase
      const token = await userCredential.user.getIdToken();

      //evia o token para o back
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      }else{
        alert("Erro ao autenticar:" + data.message);
      }
    } catch (error) {
      alert(error)
      alert("Credenciais inválidas!");
    } finally{
      setLoading(false);
    }
  };

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

export default App;