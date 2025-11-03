import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, IsNumber } from 'class-validator';

export class UpdateListingDto {
  @IsInt() id_ciudad!: number;
  @IsOptional() @IsInt() id_zona?: number | null;

  @IsInt() id_politica_cancelacion!: number;

  @IsNotEmpty() @IsString() @MaxLength(200) titulo!: string;
  @IsOptional() @IsString() descripcion?: string | null;
  @IsOptional() @IsString() direccion?: string | null;

  @IsInt() @Min(1) capacidad!: number;
  @IsNumber() @Min(0) precio_noche_base!: number;

  @IsInt() @Min(1) min_noches!: number;
  @IsInt() @Min(1) max_noches!: number;

  @IsOptional() @IsString() hora_checkin?: string | null;
  @IsOptional() @IsString() hora_checkout?: string | null;

  @IsNotEmpty() @IsString() moneda!: string;
}
