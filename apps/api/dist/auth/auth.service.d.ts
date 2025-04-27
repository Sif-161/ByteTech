import { RegisterDto } from "./dto/register.dto";
export declare class AuthService {
    verifyToken(token: string): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
    logout(uid: string): Promise<any>;
}
