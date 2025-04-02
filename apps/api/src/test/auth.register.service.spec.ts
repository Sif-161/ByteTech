import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import * as admin from 'firebase-admin';

// Testes feitos para verificar as integrações e validações de cadastro do firebase

// Mock do Firebase
jest.mock('firebase-admin', () => ({
    apps: [],
    initializeApp: jest.fn(),
    auth: jest.fn().mockReturnValue({
        createUser: jest.fn().mockResolvedValue({
            uid: 'novo-usuario-123',
            email: 'teste@exemplo.com',
            displayName: 'Novo usuario',
        }),
    }),
}));

describe('AuthService - Registro', () => {
    let authService: AuthService;
    let firebaseAuthMock: jest.Mocked<admin.auth.Auth>;

    // Configuração inicial antes de cada teste
    // @autor: Odilon
    // @data: 30/03/2025
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        firebaseAuthMock = admin.auth() as jest.Mocked<admin.auth.Auth>;
    });

    // Dados mockados para simular um usuário válido
    // @autor: Odilon
    // @data: 30/03/2025
    // MONTAGEM DE CENÁRIO
    const mockUserData = {
        email: 'teste@exemplo.com',
        password: 'Senha@123',
        fullName: 'Novo usuario',
        phone: '+7511999999999'
    };

    // Teste para registro bem-sucedido de usuário
    // @autor: Odilon
    // @data: 30/03/2025
    it('deve registrar usuários com dados validos', async () => {
        // MONTAGEM DE CENÁRIO
        // (já configurado no mock global e no beforeEach)

        // EXECUÇÃO
        const result = await authService.register(mockUserData);

        // VERIFICAÇÃO
        expect(firebaseAuthMock.createUser).toHaveBeenCalledWith({
            email: mockUserData.email,
            password: mockUserData.password,
            displayName: mockUserData.fullName,
            phoneNumber: mockUserData.phone,  
        });

        expect(result).toEqual({
            message: 'Usuário cadastrado com sucesso',
            uid: 'novo-usuario-123',
            email: mockUserData.email
        });
    });

    // Teste para tratamento de erro quando email já existe
    // @autor: Odilon
    // @data: 30/03/2025
    it('deve lançar umm erro para email duplicado', async () => {
        // MONTAGEM DE CENÁRIO
        firebaseAuthMock.createUser.mockRejectedValueOnce({
            code: 'auth/email-ja-existe',
            message: 'Email já cadastrado'
        });

        // EXECUÇÃO E VERIFICAÇÃO
        await expect(authService.register(mockUserData))
            .rejects.toThrow('Erro ao cadastrar usuário: Email já cadastrado');
    });

    // Teste para tratamento de erro quando senha é muito fraca
    // @autor: Odilon
    // @data: 30/03/2025
    it('deve lançar um erro para uma senha fraca', async () => {
        // MONTAGEM DE CENÁRIO
        firebaseAuthMock.createUser.mockRejectedValueOnce({
            code: 'auth/senha-fraca',
            message: 'Senha muito fraca'
        });

        // EXECUÇÃO E VERIFICAÇÃO
        await expect(authService.register({
            ...mockUserData,
            password: '123'
        })).rejects.toThrow('Erro ao cadastrar usuário: Senha muito fraca');
    });
});