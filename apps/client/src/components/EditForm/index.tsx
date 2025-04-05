import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Upload, Space, Input } from "antd";
import "./style.css"

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

interface ProductEditFormProps {
    initialValues?: any;
    onSave: (values: any) => void;
    onCancel: () => void;
    loading?: boolean;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({
    initialValues,
    onSave,
    onCancel,
    loading = false,
}) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onSave}
            initialValues={initialValues}
        >
            <Form.Item
                label="Nome do Produto"
                name="name"
                rules={[{ required: true, message: 'Por favor, insira o nome do produto' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Preço"
                name="price"
                rules={[{ required: true, message: 'Por favor, insira o preço' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01}
                    formatter={(value?: string | number) =>
                        `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value?: string) => {
                        const cleanedValue = value?.replace(/[^\d,.]/g, '').replace(',', '.') || '0';
                        return parseFloat(cleanedValue);
                    }}
                />
            </Form.Item>

            <Form.Item
                label="Quantidade"
                name="quantity"
                rules={[{ required: true, message: 'Por favor, insira a quantidade' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                />
            </Form.Item>

            <Form.Item
                label="Categorias"
                name="categories"
                rules={[{ required: true, message: 'Por favor, insira pelo menos uma categoria' }]}
            >
                <Input placeholder="Separe múltiplas categorias por vírgula" />
            </Form.Item>

            <Form.Item
                label="Imagem do Produto"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Adicionar Imagem</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Salvar Alterações
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default ProductEditForm;