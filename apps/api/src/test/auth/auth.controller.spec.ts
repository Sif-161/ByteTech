import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { RegisterDto } from '../../auth/dto/register.dto';

// Testes feitos para verificar as rotas e status http do /verify
describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    // Dados mockados para teste de registro
    const mockUserData: RegisterDto = {
        email: 'teste@exemplo.com',
        password: 'Senha@123',
        fullName: 'usuario teste',
        phone: '+7511999999999'
    };

    const mockUserResponse = {
        message: 'Usuário cadastrado com sucesso',
        uid: 'novo-usuario-123',
        email: 'teste@exemplo.com'
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        verifyToken: jest.fn().mockResolvedValue({ uid: 'user123' }),
                        register: jest.fn().mockResolvedValue(mockUserResponse),
                    },
                },
            ],
        }).compile();
        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    // ==========================================
    // TESTES PARA VERIFICAÇÃO DE TOKEN (/verify)
    // ==========================================

    /* Cria uma requisisão falsa com um token válido e verifica 
    se o método verifyToken do AuthService é chamado com o token correto.*/
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

    // ==========================================
    // TESTES PARA REGISTRO DE USUÁRIO (/register)
    // ==========================================

    // Teste para registro bem-sucedido
    // @autor: Odilon
    // @data: 30/03/2025
    it('Deve registrar um novo usário com dados válidos', async () => {
        // MONTAGEM DE CENARIO
        const registerDto: RegisterDto = { ...mockUserData };

        // EXECUÇÃO
        const result = await authController.register(registerDto);

        // VERIFICAÇÃO
        expect(result).toEqual({
            message: 'Usuário cadastrado com sucesso',
            user: mockUserResponse
        });
        expect(authService.register).toHaveBeenCalledWith(registerDto);
    });

    // Teste para tratamento de erros no registro
    // @autor: Odilon
    // @data: 30/03/2025
    it('Deeve retornar erro quando o serviço falhar', async () => {
        // MONTAGEM DE CENARIO
        const registerDto: RegisterDto = { ...mockUserData };
        const errorMessage = 'Erro ao cadatrar usuário';
        jest.spyOn(authService, 'register').mockRejectedValueOnce( new Error(errorMessage));

        // EXECUÇÃO E VERIFICAÇÃO
        await expect(authController.register(registerDto)).rejects.toThrow(errorMessage);
    });

    // Teste para validação de email existente
    // @autor: odilon
    // @data: 30/03/2025
    it('Deve retornar erro específico para email já cadastrado', async () => {
        // MONTAGEM DE CENARIO
        const registerDto: RegisterDto = { ...mockUserData };
        const error = new Error('Email já cadastrado');
        jest.spyOn(authService, 'register').mockRejectedValueOnce(error);

        // EXECUÇÃO E VERIFICAÇÃO
        await expect(authController.register(registerDto)).rejects.toThrow('Email já cadastrado');
    });
});