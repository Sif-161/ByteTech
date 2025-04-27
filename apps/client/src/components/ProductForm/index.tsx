import React from "react";
import { Button, Form, InputNumber, Space, Input, message } from "antd";
import "./style.css"

interface ProductFormProps {
    initialValues?: any;
    onSave: (values: any) => void;
    onCancel: () => void;
    loading?: boolean;
    isCreating?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialValues,
    onSave,
    onCancel,
    loading = false,
    isCreating = false,
}) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        form.resetFields();
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                categories: initialValues.categories?.join(', ') || ''
            });
        }
    }, [initialValues, form]);

    const handleSubmit = (values: any) => {
        const processedValues = {
            ...values,
            categories: values.categories
                .split(',')
                .map((cat: string) => cat.trim())
                .filter((cat: string) => cat.length > 0)
        };

        if (processedValues.categories.length === 0) {
            message.error('Por favor, insira pelo menos uma categoria');
            return;
        }

        onSave(processedValues);
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={{
                image: '',
                categories: '',
                ...initialValues
            }}
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
                label="Quantidade em Estoque"
                name="quantity"
                rules={[{ required: true, message: 'Por favor, insira a quantidade' }]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    precision={0}
                />
            </Form.Item>

            <Form.Item
                label="Categorias"
                name="categories"
                rules={[{ required: true, message: 'Por favor, insira pelo menos uma categoria' }]}
                extra="Separe múltiplas categorias por vírgula"
            >
                <Input
                    placeholder="Ex: Hardware, Processadores"
                    defaultValue={initialValues?.categories?.join(', ')}
                />
            </Form.Item>

            <Form.Item
                label="Imagem do Produto"
                name="image"
                rules={[{ 
                    type: 'url',
                    required: true, 
                    message: 'Por favor, insira uma URL válida',
                }]}
            >
                <Input placeholder="https://exemplo.com/imagem.jpg" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {isCreating ? 'Criar Produto' : 'Salvar Alterações'}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;