/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() nombre: string;
  @IsString() apellido: string;
  @IsEmail() correo: string;
  @IsOptional() @IsString() telefono?: string;
  @IsString() @MinLength(6) password: string;
}
