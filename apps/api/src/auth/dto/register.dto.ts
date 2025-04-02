import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
