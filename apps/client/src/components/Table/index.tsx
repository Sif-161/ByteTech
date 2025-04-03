import React, { useEffect, useState } from 'react';
import { Table, Tag, Dropdown, Button, Spin, message } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './styles.css';

interface ProductType {
  id: string;
  name: string;
  price: number;
  categories: string[];
  quantity: number;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');

      console.log('Status:', response.status);
      console.log('Content-Type:', response.headers.get('content-type'));

      const text = await response.text();
      console.log('Raw response:', text);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.headers.get('content-type')?.includes('application/json')) {
        const products = JSON.parse(text);
        setData(products);
      } else {
        throw new Error('Resposta não é JSON');
      }

    } catch (error) {
      message.error('Erro ao carregar produtos');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = async (record: ProductType, key: string) => {
    try {
      if (key === 'edit') {
        console.log('Editar:', record);
        // Lógica de edição aqui
      } else if (key === 'delete') {
        console.log('Excluir:', record);
        // Lógica de exclusão aqui
      }
    } catch (error) {
      message.error('Erro ao executar ação');
      console.error('Error:', error);
    }
  };

  const columns: TableProps<ProductType>['columns'] = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div className='product-name'>
          {text.split(',').map((part: string, i: number) => (
            <div key={i}>{part.trim()}{i < text.split(',').length - 1 ? ',' : ''}</div>
          ))}
        </div>
      ),
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      render: (value) => (
        <div className='product-price'>
          {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      ),
    },
    {
      title: 'Categorias',
      key: 'categories',
      dataIndex: 'categories',
      render: (_, { categories }) => (
        <>
          {categories.map((category) => (
            <Tag color='geekblue' key={category} className='custom-tag'>
              {category.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value) => (
        <div className={`product-quantity ${value < 10 ? 'low-stock' : ''}`}>
          {value} {value === 1 ? 'unidade' : 'unidades'}
        </div>
      ),
    },
    {
      title: 'Ações',
      dataIndex: 'action',
      render: (_, record) => {
        const items: MenuProps['items'] = [
          {
            key: 'edit',
            label: 'Editar',
          },
          {
            key: 'delete',
            label: 'Deletar',
            danger: true,
          },
        ];

        return (
          <Dropdown menu={{ items, onClick: ({ key }) => handleMenuClick(record, key) }} trigger={['click']}>
            <Button type='text' icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table<ProductType>
        columns={columns}
        dataSource={data.map(item => ({ ...item, key: item.id }))}
      />
    </Spin>
  );
};
export default DataTable;