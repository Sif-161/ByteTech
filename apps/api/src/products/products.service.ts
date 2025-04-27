import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";

@Injectable()
export class ProductsService {
    private readonly db: admin.firestore.Firestore;

    constructor() {
        this.db = admin.firestore();
    }

    async findAll() {
        const snapshot = await this.db.collection('products').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    async remove(id: string) {
        await this.db.collection('products').doc(id).delete();
        return { success: true };
    }

    async create(product: CreateProductDto){
        const productData = {
            name: product.name,
            price: Number(product.price),
            quantity: Number(product.quantity),
            categories: Array.isArray(product.categories)
                ? product.categories
                : [product.categories],
            image: product.image || null,
        };

        const docRef = await this.db.collection('products').add(productData);
        return { id: docRef.id, ...productData };
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const productRef = this.db.collection('products').doc(id);
        
        const doc = await productRef.get();
        if (!doc.exists) {
            throw new Error('Product not found');
        }
    
        const updateData: any = {};
    
        if (updateProductDto.price !== undefined) {
            updateData.price = Number(updateProductDto.price);
        }
        if (updateProductDto.quantity !== undefined) {
            updateData.quantity = Number(updateProductDto.quantity);
        }
        if (updateProductDto.categories !== undefined) {
            updateData.categories = Array.isArray(updateProductDto.categories)
                ? updateProductDto.categories
                : [updateProductDto.categories];
        }
        if (updateProductDto.image !== undefined) {
            updateData.image = updateProductDto.image;
        }

        updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

        if (Object.keys(updateData).length > 1) {
            await productRef.update(updateData);
        } else {
            console.warn('Nenhum dado válido para atualização foi fornecido');
        }

        const updatedDoc = await productRef.get();
        return { 
            id,
            ...updatedDoc.data(),
        };
    }
}