import { IsArray, isNumber, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsArray()
    @IsString({ each: true })
    categories: string[];
}