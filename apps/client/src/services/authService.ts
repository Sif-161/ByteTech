import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { apiRequest } from "../utils/apiUtils";
import { message } from "antd";

export const AuthService = {
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
    }
}