import React, { useState } from 'react';
import { Card, Tag, Button, message, Space } from 'antd';
import { ProductType, ProductService } from '../../services/productService';

const { Meta } = Card;

interface ProductCardProps {
  product: ProductType;
  onUpdateProduct: (updatedProduct: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdateProduct }) => {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (product.quantity <= 0) {
      message.warning('Este produto está esgotado!');
      return;
    }

    setLoading(true);
    try {
      const updatedProduct = await ProductService.update(product.id, {
        quantity: product.quantity - 1
      });
      onUpdateProduct(updatedProduct);
      message.success('Compra realizada com sucesso!');
    } catch (error) {
      message.error('Falha ao realizar compra');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{ width: 240, margin: '16px' }}
      cover={
        <img
          alt={product.name}
          src={product.image || 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
          style={{ height: '160px', objectFit: 'cover' }}
        />
      }
      actions={[
        <div style={{ padding: '0 16px 16px' }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Tag color='green'>R$ {product.price.toFixed(2)}</Tag>
              <Tag color={product.quantity > 0 ? 'blue' : 'red'}>
                {product.quantity > 0 ? `Em estoque: ${product.quantity}` : 'Esgotado'}
              </Tag>
            </div>
            <Button
              type='primary'
              onClick={handleBuy}
              loading={loading}
              disabled={product.quantity <= 0}
              style={{ width: '100%' }}
            >
              Comprar
            </Button>
          </Space>
        </div>
      ]}
    >
      <Meta
        title={product.name}
        description={
          <div>
            {product.categories.map((category: string) => (
              <Tag key={category}>{category}</Tag>
            ))}
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;