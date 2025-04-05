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
                : [product.categories]
        };
        const docRef = await this.db.collection('products').add(productData);
        return { id: docRef.id, ...productData };
    }
    async update(id, updateProductDto) {
        const productRef = this.db.collection('products').doc(id);
        const updateData = {
            ...updateProductDto,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
        await productRef.update(updateData);
        return { id, ...updateData };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductsService);
//# sourceMappingURL=products.service.js.map