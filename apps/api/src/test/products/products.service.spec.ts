import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "../../products/products.service";
import { CreateProductDto } from "../../products/dto/create.product.dto";
import * as admin from "firebase-admin";

// Mock do firestore
const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    get: jest.fn(),
    doc: jest.fn().mockReturnThis(),
    delete: jest.fn(),
    add: jest.fn(),
};

// Mock do fibase admin
jest.mock('firebase-admin', () => ({
    firestore: jest.fn(() => mockFirestore),
}));

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        jest.clearAllMocks();
    });

    /* Testa o método findAll para verificar se retorna todos os produtos
     corretamente formatados a partir do firestore */
    // @autor: Odilon
    // @data: 04/04/2025
    it('Deve retornar uma lista de produtos', async () => {
        // MONTAGEM DE CENARIO
        const mockProducts = [
            {
                id: '1',
                name: 'produto 1',
                price: 100,
                quantity: 5,
                categories: ['categoria 1', 'categoria 2']
            },
            {
                id: '2',
                name: 'produto 2',
                price: 200,
                quantity: 10,
                categories: ['categoria 3', 'categoria 4']
            },
        ];

        mockFirestore.get.mockResolvedValueOnce({
            docs: mockProducts.map(product => ({
                id: product.id,
                data: () => ({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    categories: product.categories
                })
            }))
        });

        // EXECUÇÃO 
        const result = await service.findAll();

        // VERIFICAÇÃO
        expect(result).toEqual(mockProducts);
        expect(mockFirestore.collection).toHaveBeenCalledWith('products');
        expect(mockFirestore.get).toHaveBeenCalled();
    });

    /* Testa o método remove para verificar se deleta um produto
    com ID correto e retorna { success true } */
    // @autor: Odilon
    // @data 04/04/2025
    it('Deve remover um produto existente', async () => {
        // MONTAGEM DE CENARIO
        const productId = '1';
        mockFirestore.delete.mockResolvedValueOnce(undefined);

        // EXECUÇÃO
        const result = await service.remove(productId);

        // VERIFICAÇÃO
        expect(result).toEqual({ success: true });
        expect(mockFirestore.collection).toHaveBeenCalledWith('products');
        expect(mockFirestore.doc).toHaveBeenCalledWith(productId);
        expect(mockFirestore.delete).toHaveBeenCalled();
    });

    /* Testa o método create para verificar se cria um novo produto
    com os dados corretamente formatados */
    // @autor: Odilon
    // @data: 04/04/2025
    it('Deve criar um novo produto com dados formatados', async () => {
        // MONTAGEM DE CENARIO
        const newProduct: CreateProductDto = {
            name: 'novo produto',
            price: 100,
            quantity: 5,
            categories: ['eletronico']
        };

        const expectedProductData = {
            name: 'novo produto',
            price: 100,
            quantity: 5,
            categories: ['eletronico']
        };

        const docRef = { id: '123' };
        mockFirestore.add.mockResolvedValueOnce(docRef);

        // EXECUÇÃO
        const result = await service.create(newProduct);

        // VERIFICAÇÃO
        expect(result).toEqual({
            id: '123',
            ...expectedProductData
        });
        expect(mockFirestore.collection).toHaveBeenCalledWith('products');
        expect(mockFirestore.add).toHaveBeenCalledWith(expectedProductData);
    });

    /* Testa o método create para verificar se lida corretamente
    com categorias quando enviadas como array */
    // @autor: Odilon
    // @data: 04/04/2025
    it('Deve criar produtos mantendo categorias como array quando fornecido', async () => {
        // MONTAGEM DE CANRIO
        const newProduct: CreateProductDto = {
            name: 'novo produto',
            price: 100,
            quantity: 5,
            categories: ['eletronico', 'celular']
        };

        const docRef = { id: '123' };
        mockFirestore.add.mockResolvedValueOnce(docRef);

        // EXECUÇÃO 
        const result = await service.create(newProduct);

        // VERIFICAÇÃO
        expect(result.categories).toEqual(['eletronico', 'celular']);
    });
});
