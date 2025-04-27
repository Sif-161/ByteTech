import Header from "../../components/Header";
import { useEffect, useState } from 'react';
import { ProductType, ProductService } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import { Row, Col, Spin } from 'antd';
import './styles.css';

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductUpdate = (updatedProduct: ProductType) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <div className='container-home'>
      <Header />
      <div className='content-home'>
        <h1>Produtos Disponíveis</h1>
        
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]} justify="start">
            {products.map(product => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard 
                  product={product} 
                  onUpdateProduct={handleProductUpdate} 
                />
              </Col>
            ))}
          </Row>
        )}

        {!loading && products.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>Nenhum produto disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;