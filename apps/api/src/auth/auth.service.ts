import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    async verifyToken(token: string): Promise<any>{
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            throw new Error("Token inválido");
        }
    }

    async register(registerDto: RegisterDto): Promise<any>{
        const { email, password, fullName, phone } = registerDto;

        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: fullName,
                phoneNumber: phone,
            });

            return {
                message: "Usuário cadastrado com sucesso",
                uid:userRecord.uid,
                email: userRecord.email,
            };
        } catch (error) {
            throw new Error("Erro ao cadastrar usuário: " + error.message);
        }

    }
}