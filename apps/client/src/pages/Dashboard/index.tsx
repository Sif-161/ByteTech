import React, { JSX, useState } from 'react';
import { Layout, theme } from 'antd';
import CustomSider from '../../components/SideBar';
import DataTable from '../../components/Table';
import './styles.css';

const { Header, Content } = Layout;

type MenuKey = '1' | '2' | '3';

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeKey, setActiveKey] = useState<MenuKey>('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelect = (item: { key: string }) => {
    const validKeys = ['1', '2', '3'] as const;
    if (validKeys.includes(item.key as MenuKey)) {
      setActiveKey(item.key as MenuKey);
    }
  };

  const getContent = () => {
    const contents: Record<MenuKey, JSX.Element> = {
      '1': <DataTable />,
      '2': <div>Conteúdo da Página 2</div>,
      '3': <div>Conteúdo da Página 3</div>
    };
    return contents[activeKey] || <div>Selecione uma página</div>;
  };

  const getTitle = () => {
    const titles: Record<MenuKey, string> = {
      '1': 'Tabela de Estoque',
      '2': 'Criação de Produto',
      '3': 'teste'
    };
    return titles[activeKey];
  };

  return (
    <Layout className="dash-layout">
      <CustomSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onMenuSelect={handleMenuSelect}
      />
      <Layout>
        <Header className="dash-header" style={{ background: colorBgContainer }}>
          <div className='header-title'>
            {getTitle()}
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