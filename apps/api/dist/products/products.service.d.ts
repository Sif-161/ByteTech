import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
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
        image: string | null;
        id: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
    }>;
}
