import React from 'react';
import { Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './styles.css';

const { Sider } = Layout;

interface CustomSiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onMenuSelect: (item: { key: string }) => void;
}

const SideBar: React.FC<CustomSiderProps> = ({ collapsed, onCollapse, onMenuSelect }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="custom-sider">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onSelect={onMenuSelect}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Estoque',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'Criar produto',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
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