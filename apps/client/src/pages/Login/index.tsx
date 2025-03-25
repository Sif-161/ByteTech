import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import './styles.css';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
            name="Email"
            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
            style={{ marginBottom: '16px' }}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="senha"
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
            <Button block type="primary" htmlType="submit">
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