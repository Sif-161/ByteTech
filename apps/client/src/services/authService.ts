import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { apiRequest } from "../utils/apiUtils";
import { message } from "antd";

export const AuthService = {

    async getCurrentToken(): Promise<string | null> {
        const user = auth.currentUser;
        if (user) {
            return user.getIdToken();
        }
        return null;
    },

    async login(email: string, password: string): Promise<void> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            await apiRequest('/auth/verify', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

        } catch (error) {
            message.error('Credenciais inválidas ou erro na autenticação');
            throw error;
        }
    },

    async register(values: {
        fullName: string;
        email: string;
        password: string;
        phone: string;
    }): Promise<void> {
        try {
            await apiRequest('auth/register', {
                method: 'POST',
                body: values,
            });
            message.success('Usuário cadastrado com sucesso!');
        } catch (error) {
            message.error("Erro ao cadastrar usuário. Tente novamente!");
            throw error;
        }
    },

    async logout(): Promise<void> {
        try {
            const currentUser = auth.currentUser;
            const token = currentUser ? await currentUser.getIdToken() : null;

            await signOut(auth);

            if (token) {
                await apiRequest('/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            }

            message.success('Logout realizado com sucesso!');
        } catch (error) {
            message.error('Erro ao fazer logout');
            throw error;
        }
    }
}