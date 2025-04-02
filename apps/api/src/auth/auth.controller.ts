import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login
  @Post('verify')
  async verifyToken(@Req() request: any) {
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const user = await this.authService.verifyToken(token);
      return { message: 'Usuário autenticado', user };
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  //registro
  @Post('register')
  async register(@Body() registerDto: RegisterDto){
    const user = await this.authService.register(registerDto);
    return { message: 'Usuário cadastrado com sucesso', user };
  }
}
