"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let AuthService = class AuthService {
    async verifyToken(token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        }
        catch (error) {
            throw new Error("Token inválido");
        }
    }
    async register(registerDto) {
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
                uid: userRecord.uid,
                email: userRecord.email,
            };
        }
        catch (error) {
            throw new Error("Erro ao cadastrar usuário: " + error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map