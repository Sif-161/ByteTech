import React from 'react';
import { Modal } from 'antd';
import ProductEditForm from '../EditForm';
import "./styles.css"

interface EditProductModalProps {
    open: boolean;
    onCancel: () => void;
    onSave: (values: any) => void;
    initialValues?: any;
    loading?: boolean;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    open,
    onCancel,
    onSave,
    initialValues,
    loading = false,
}) => {
    return (
        <Modal
            title="Editar Produto"
            open={open}
            onCancel={onCancel}
            footer={null}
            width={800}
            destroyOnClose
        >
            <ProductEditForm
                initialValues={initialValues}
                onSave={onSave}
                onCancel={onCancel}
                loading={loading} 
            />
        </Modal>
    );
};

export default EditProductModal;