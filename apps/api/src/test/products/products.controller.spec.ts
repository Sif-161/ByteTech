import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "../../products/products.controller";
import { ProductsService } from "../../products/products.service";
import { CreateProductDto } from "../../products/dto/create.product.dto";
import { UpdateProductDto } from "../../products/dto/update.product.dto";

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'produto 1' }]),
                        create: jest.fn().mockImplementation((dto: CreateProductDto) => Promise.resolve({ id: '1', ...dto })),
                        remove: jest.fn().mockResolvedValue({ success: true }),
                        update: jest.fn().mockImplementation((id: string, dto: UpdateProductDto) =>
                            Promise.resolve({ id, ...dto })),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
    });

    /* Testa o método findAll do controller para ver se retorna todos os produtos 
    e se o service foi chamado corretamente*/
    // @autor: Odilon
    // @data: 04/04/2025
    it('Deve retornar todos os produtos', async () => {
        // MONTAGEM DE CENARIO
        const expectedProducts = [{ id: '1', name: 'produto 1' }];
        jest.spyOn(service, 'findAll').mockResolvedValue(expectedProducts);

        // EXECUÇÃO
        const result = await controller.findAll();

        //VERIFICAÇÃO
        expect(result).toEqual(expectedProducts);
        expect(service.findAll).toHaveBeenCalled();
    });

    /* Testa o método create do controller para ver se cria um novo produto
    com os dados corretos e retorna o status HTTP 201*/
    // @autor: Odilon
    // @data: 04/04/2025
    it('Deve criar um produto', async () => {
        // MONTAGEM DE CENARIO
        const newProduct: CreateProductDto = {
            name: 'novo produto',
            price: 10.0,
            quantity: 5,
            categories: ['categoria 1', 'categoria 2'],
        }
        const createdProduct = { id: '1', ...newProduct };
        jest.spyOn(service, 'create').mockResolvedValue(createdProduct);

        // EXECUÇÃO
        const result = await controller.create(newProduct);

        // VERIFiCAÇÃO
        expect(result).toEqual(createdProduct);
        expect(service.create).toHaveBeenCalledWith(newProduct);
    });

    /* Testa o método remove do controller para verificar se deleta 
    o produto com o ID correto e retorna o status HTTP 204 (NO_CONTENT) */
    // @autor: Odilon
    // @data: 04/04/2025
    it('Deve remover um produto existente', async () => {
        // MONTAGEM DE CENARIO
        const productId = '1';
        const expectedResult = { success: true };
        jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

        // EXECUÇÃO
        const result = await controller.remove(productId);

        // VERIFICAÇÃO
        expect(result).toEqual(expectedResult);
        expect(service.remove).toHaveBeenCalledWith(productId);
    });

    /* Testa o método update do controller para verificar se atualiza
    o produto com os dados corretos e retorna o status HTTP 200 (OK) */
    // @autor: Odilon
    // @data: 05/04/2025

    it('Deve atualizar um produto existente', async () => {
        // MONTAGEM DE CENARIO
        const productId = '1';
        const updateData: UpdateProductDto = {
            name: 'produto atualizado',
            price: 15.0,
            quantity: 10,
            categories: ['categoria atualizada'],
        };

        const mockFieldValue = {
            toDate: () => new Date(),
            isEqual: () => true
        };

        const expectedResponse = {
            id: productId,
            ...updateData,
            updatedAt: mockFieldValue
        }

        jest.spyOn(service, 'update').mockImplementation(async (id, dto) => ({
            id,
            ...dto,
            updatedAt: mockFieldValue
        }));

        // EXECUÇÃO 
        const result = await controller.update(productId, updateData);

        // VERIFICAÇÃO 
        expect(result).toEqual(expectedResponse);
        expect(service.update).toHaveBeenCalledWith(productId, updateData);
    });

    /* Testa se o método update valida o ID como UUID */
    // @autor: Odilon
    // @data: 05/04/2025
    it('Deve validar o ID como UUID', async () => {
        const productId = 'uuid-123';
        const updateData: UpdateProductDto = {
            name: 'produto atualizado',
        };

        const mockFieldValue = {
            toDate: () => new Date(),
            isEqual: () => true
        };

        const expectedResponse = {
            id: productId,
            ...updateData,
            updatedAt: mockFieldValue
        }

        jest.spyOn(service, 'update').mockImplementation(async (id, dto) => ({
            id,
            ...dto,
            updatedAt: mockFieldValue
        }));

        // EXECUÇÃO
        const result = await controller.update(productId, updateData);

        // VERIFICAÇÃO
        expect(result).toEqual(expectedResponse);
        expect(service.update).toHaveBeenCalledWith(productId, updateData);
    });
});