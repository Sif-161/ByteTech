import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<{
        id: string;
    }[]>;
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        price: number;
        quantity: number;
        categories: string[];
        image: string | null;
        id: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
    }>;
}
