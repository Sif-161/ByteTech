import React from 'react';
import { Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  InboxOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../../assets/logo.png'
import './styles.css';

const { Sider } = Layout;

interface CustomSiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onMenuSelect: (item: { key: string }) => void;
  onLogout: () => void;
}

const SideBar: React.FC<CustomSiderProps> = ({ collapsed, onCollapse, onMenuSelect, onLogout }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="custom-sider">
      <div className="logo-container">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: collapsed ? '80px' : '100px',
            height: 'auto',
            transition: 'all 0.2s',
            margin: '16px auto',
            display: 'block'
          }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onSelect={onMenuSelect}
        items={[
          {
            key: '1',
            icon: <InboxOutlined style={{ fontSize: '17px' }} />,
            label: 'Estoque',
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'Gerenciar Usuários',
          },
        ]}
      />
      <div className="logout-container">
        <Button
          type='text'
          icon={<LogoutOutlined />}
          onClick={onLogout}
          className='logout-button'
        >
          {collapsed ? '' : 'Sair'}
        </Button>
      </div>

      <div className="collapse-container">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          className="collapse-button"
        />
      </div>
    </Sider>
  );
};

export default SideBar;