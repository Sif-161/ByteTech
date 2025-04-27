import React, { JSX, useState} from 'react';
import { Layout, theme, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AuthService } from "../../services/authService";
import CustomSider from '../../components/SideBar';
import DataTable from '../../components/ProductTable';
import { useNavigate } from "react-router-dom";
import './styles.css';

const { Header, Content } = Layout;

type MenuKey = '1' | '2';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [activeKey, setActiveKey] = useState<MenuKey>('1');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelect = (item: { key: string }) => {
    const validKeys = ['1', '2'] as const;
    if (validKeys.includes(item.key as MenuKey)) {
      setActiveKey(item.key as MenuKey);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      window.history.replaceState(null, '', '/login');
      navigate('/login', {replace: true});
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  const getContent = () => {
    const contents: Record<MenuKey, JSX.Element> = {
      '1': <DataTable 
              createModalOpen={createModalOpen}
              onCreateModalClose={() => setCreateModalOpen(false)}
            />,
      '2': <div>Conteúdo da Página 2</div>
    };
    return contents[activeKey] || <div>Selecione uma página</div>;
  };

  const getTitle = () => {
    const titles: Record<MenuKey, string> = {
      '1': 'Tabela de Estoque',
      '2': 'Gerenciar Usuários'
    };
    return titles[activeKey];
  };

  return (
    <Layout className="dash-layout">
      <CustomSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onMenuSelect={handleMenuSelect}
        onLogout={handleLogout}
      />
      <Layout>
        <Header className="dash-header" style={{ background: colorBgContainer }}>
          <div className='header-container'>
            <div className='header-title'>
              {getTitle()}
            </div>
            {activeKey === '1' && (
              <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => {
                setCreateModalOpen(false);
                setTimeout(() => {
                  setCreateModalOpen(true);
                }, 0);
              }}
              className = "add-product-button"
              >
              </Button>
            )}
          </div>
        </Header>
        <Content className="dash-content" style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
          {getContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;