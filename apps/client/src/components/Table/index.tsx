import React, { useEffect, useState } from 'react';
import { Table, Tag, Dropdown, Button, Spin, message } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import DeleteProductModal from "../DeleteModal";
import EditProductModal from '../EditModal';
import { ProductService } from '../../services/productService';
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: ProductType) => {
    setCurrentProduct(product);
    setEditModalOpen(true);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await ProductService.getAll();
      setData(products);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setDeleteLoading(true);
      await ProductService.delete(productId);
      setDeleteModalOpen(false);
      await fetchProducts();
    } finally {
      setDeleteLoading(false);
    }
  };

  const showDeleteConfirm = (product: ProductType) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
    }
  };

  const saveProduct = async (values: any) => {
    try {
      setSaveLoading(true);
      await ProductService.update(currentProduct.id, values);
      setEditModalOpen(false);
      await fetchProducts();
    } finally {
      setSaveLoading(false);
    }
  }

  const handleMenuClick = async (record: ProductType, key: string) => {
    try {
      if (key === 'edit') {
        handleEditClick(record);
      } else if (key === 'delete') {
        showDeleteConfirm(record);
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
    <>
      <Spin spinning={loading}>
        <Table<ProductType>
          columns={columns}
          dataSource={data.map(item => ({ ...item, key: item.id }))}
        />
      </Spin>

      <DeleteProductModal
        open={deleteModalOpen}
        product={productToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
        loading={deleteLoading}
      />

      <EditProductModal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSave={saveProduct}
        initialValues={currentProduct}
        loading={saveLoading}
      />
    </>
  );
};
export default DataTable;