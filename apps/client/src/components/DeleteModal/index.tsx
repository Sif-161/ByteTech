import React from "react";
import { Modal } from "antd";

interface DeleteProductModalProps {
  open: boolean;
  product: {id: string; name: string} | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  open,
  product,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal
      title="Comfirmar exclusão"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText='Deletar'
      cancelText="Cancelar"
      okButtonProps={{ danger: true, loading }}
      destroyOnClose 
    >
      {product && (
        <p>Tem certeza que deseja deletar o produto<strong>"{product.name}"</strong>?</p>
      )}
    </Modal>
  );
};

export default DeleteProductModal;