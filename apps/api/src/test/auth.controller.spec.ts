import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';

// Testes feitos para verificar as rotas e status http do /verify

describe ('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        verifyToken: jest.fn().mockResolvedValue({ uid: 'user123' }),
                    },
                },
            ],
        }).compile();
        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    // Cria uma requisisão falsa com um token válido e verifica se o método verifyToken do AuthService é chamado com o token correto.
    // @autor: Odilon
    // @data: 28/03/2025
    it('Deve autenticar um usuário com um token válido', async () => {

        // MONTAGEM DE CENARIO
        const request = { headers: {authorization: 'Bearer valid-token' } };

        // EXECUÇÃO
        const response = await authController.verifyToken(request);

        // VERIFICAÇÃO
        expect(response).toEqual({ message: 'Usuário autenticado', user: { uid: 'user123' } });
    });

    // Cria uma requisisão falsa sem um token e verifica se o método verifyToken do AuthService lança um erro.
    // @autor: Odilon
    // @data: 28/03/2025
    it('Deve retornar erro se o token não for enciado', async () => {

        //MONTAGEM DE CENARIO
        const request = { headers: {} };

        // EXECUÇÃO E VERIFICAÇÃO
        await expect(authController.verifyToken(request)).rejects.toThrow('Token não fornecido');
    });
});