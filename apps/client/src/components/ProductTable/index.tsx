import React, { useEffect, useState } from 'react';
import { Table, Tag, Dropdown, Button, Spin, message, Image } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import DeleteProductModal from "../DeleteModal";
import ProductModal from '../ProductModal';
import { ProductService, ProductType } from '../../services/productService';
import './styles.css';


interface DataTableProps {
  createModalOpen?: boolean;
  onCreateModalClose?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  createModalOpen = false,
  onCreateModalClose
}) => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (createModalOpen) {
      setIsCreating(true);
      setIsModalOpen(true);
      setCurrentProduct(null);
    }
  }, [createModalOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    onCreateModalClose?.();
  };

  const handleEditClick = (product: ProductType) => {
    setCurrentProduct(product);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
    }
  };

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

  const saveProduct = async (values: any) => {
    try {
      setSaveLoading(true);
      await ProductService.update(currentProduct.id, values);
      setIsModalOpen(false);
      await fetchProducts();
    } finally {
      setSaveLoading(false);
    }
  }

  const createProduct = async (values: any) => {
    try {
      setSaveLoading(true);
      await ProductService.create(values);
      setIsModalOpen(false);
      await fetchProducts();
    } finally {
      setSaveLoading(false);
    }
  }

  const columns: TableProps<ProductType>['columns'] = [
    {
      title: 'Imagem',
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (image: string, record: ProductType) => (
        <div className='product-image-cell'>
          {image ? (
            <Image
              src={image}
              alt={record.name}
              className="product-image"
              preview={{
                maskClassName: 'custom-image-mask',
                mask: (
                  <span>
                    <EyeOutlined /> Visualizar
                  </span>
                )

              }}
            />
          ) : (
            <div className='product-image-placeholder'>Sem imagem</div>
          )}
        </div>
      ),
    },
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

      <ProductModal
        open={isModalOpen}
        onCancel={handleModalClose}
        onSave={isCreating ? createProduct : saveProduct}
        initialValues={currentProduct}
        loading={saveLoading}
        isCreating={isCreating}
      />
    </>
  );
};
export default DataTable;