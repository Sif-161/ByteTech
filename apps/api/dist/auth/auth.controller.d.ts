import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifyToken(request: any): Promise<{
        message: string;
        user: any;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: any;
    }>;
}
