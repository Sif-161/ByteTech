import { message } from "antd";
import { apiRequest } from "../utils/apiUtils";

export interface ProductType {
    id: string;
    name: string;
    price: number;
    categories: string[];
    quantity: number;
    image: string;
}

export const ProductService = {
    async getAll(): Promise<ProductType[]> {
        try {
            return await apiRequest<ProductType[]>('/products');
        } catch (error) {
            message.error('Falha ao buscar produtos');
            throw error;
        }
    },

    async getById(id: string): Promise<ProductType> {
        try {
            return await apiRequest<ProductType>(`/products/${id}`);
        } catch (error) {
            message.error('Falha ao buscar produto');
            throw error;
        }
    },

    async create (productData: Omit<ProductType, 'id'>): Promise<ProductType> {
        try {
            return await apiRequest<ProductType>('/products', {
                method: 'POST',
                body: productData,
            });
        } catch (error) {
            message.error('Falha ao criar produto');
            throw error;
        }
    },

    async update (id: string, productData: Partial<ProductType>): Promise<ProductType> {
        try {
            return await apiRequest<ProductType>(`/products/${id}`, {
                method: 'PUT',
                body: productData,
            });
        } catch (error) {
            message.error('Falha ao atualizar produto');
            throw error;
        }
    },

    async delete (id: string): Promise<void> {
        try {
            const response = await apiRequest<{success: boolean}>(`/products/${id}`, {
                method: 'DELETE',
            });

            if (response.success) {
                message.success('Produto deletado com sucesso');
            }
        } catch (error) {
            message.error('Falha ao deletar produto');
            throw error;
        }
    }
};