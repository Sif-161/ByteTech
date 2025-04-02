import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth/auth.controller'
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/dto/register.dto';

// Testes feitos para verificar as rotas e status http do /register

describe('AuthController - Registro', () => {
    let authController: AuthController;
    let authService: AuthService;

    // Dados mockados para teste
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
                        register: jest.fn().mockResolvedValue(mockUserResponse),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

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
