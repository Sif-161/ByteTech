"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let ProductsService = class ProductsService {
    db;
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
    async remove(id) {
        await this.db.collection('products').doc(id).delete();
        return { success: true };
    }
    async create(product) {
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
    async update(id, updateProductDto) {
        const productRef = this.db.collection('products').doc(id);
        const doc = await productRef.get();
        if (!doc.exists) {
            throw new Error('Product not found');
        }
        const updateData = {};
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
        }
        else {
            console.warn('Nenhum dado válido para atualização foi fornecido');
        }
        const updatedDoc = await productRef.get();
        return {
            id,
            ...updatedDoc.data(),
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductsService);
//# sourceMappingURL=products.service.js.map