import { 
    Controller,
    Get,
    Post,
    Put,
    Delete, 
    Param,
    Body,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update(id, updateProductDto);
    }
}