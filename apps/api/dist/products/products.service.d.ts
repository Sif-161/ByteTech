import { CreateProductDto } from "./dto/create.product.dto";
export declare class ProductsService {
    private readonly db;
    constructor();
    findAll(): Promise<{
        id: string;
    }[]>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    create(product: CreateProductDto): Promise<{
        name: string;
        price: number;
        quantity: number;
        categories: string[];
        id: string;
    }>;
}
