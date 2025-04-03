import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { CreateProductDto } from "./dto/create.product.dto";

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
}