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
                : [product.categories]
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
    
        const updateData: any = {
            ...updateProductDto,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
    
        if (updateData.price !== undefined) {
            updateData.price = Number(updateData.price);
        }
        if (updateData.quantity !== undefined) {
            updateData.quantity = Number(updateData.quantity);
        }
        if (updateData.categories !== undefined) {
            updateData.categories = Array.isArray(updateData.categories)
                ? updateData.categories
                : [updateData.categories];
        }
    
        await productRef.update(updateData);
        
        return { 
            id,
            ...updateData,
            updatedAt: new Date().toISOString()
        };
    }
}