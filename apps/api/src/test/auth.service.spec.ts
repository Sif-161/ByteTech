import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import * as admin from 'firebase-admin';

// Testes feitos para verificar as integrações e validações de login do firebase

// Mock do Firebase
jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'user123' }),
  }),
}));

// Simula o comportamento do Firebase para verificar o token
// @autor: Odilon
// @data: 28/03/2025
describe('AuthService', () => {
  let authService: AuthService;
  let verifyIdTokenMock: jest.Mock;

  beforeEach(async () => {

    // MONTAGEM DE CENARIO
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    verifyIdTokenMock = (admin.auth() as any).verifyIdToken as jest.Mock;
  });

  it('deve validar um token de usuário', async () => {

    // EXECUÇÃO
    const user = await authService.verifyToken('fake-token');

    // VERIFICAÇÃO
    expect(user).toEqual({ uid: 'user123' });
  });

  // Simula um erro de verificação de token do firebase
  // @autor: Odilon
  // @data: 28/03/2025
  it('deve lançar erro se o token for inválido', async () => {

    // MONTAGEM DE CENARIO
    verifyIdTokenMock.mockRejectedValueOnce(new Error('Invalid token'));

    // EXECUÇÃO E VERIFICAÇÃO
    await expect(authService.verifyToken('invalid-token')).rejects.toThrow('Token inválido');
  });
});
