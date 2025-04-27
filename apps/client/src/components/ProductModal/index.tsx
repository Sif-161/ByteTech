import React from 'react';
import { Modal } from 'antd';
import ProductForm from '../ProductForm';
import "./styles.css"

interface ProductModalProps {
    open: boolean;
    onCancel: () => void;
    onSave: (values: any) => void;
    initialValues?: any;
    loading?: boolean;
    isCreating?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
    open,
    onCancel,
    onSave,
    initialValues,
    loading = false,
    isCreating = false,
}) => {
    return (
        <Modal
            title={isCreating ? "Criar produto" : "Editar produto"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={800}
            destroyOnClose
        >
            <ProductForm
                initialValues={initialValues}
                onSave={onSave}
                onCancel={onCancel}
                loading={loading}
                isCreating={isCreating} 
            />
        </Modal>
    );
};

export default ProductModal;