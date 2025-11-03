import { IsInt, IsOptional, IsNumber, Min, Max, IsDateString } from 'class-validator';

export class CreateHostDto {
  @IsInt()
  id_anfitrion!: number; // debe existir en USUARIO

  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  calificacion_promedio?: number | null;

  @IsDateString() // 'YYYY-MM-DD'
  fecha_registro!: string;
}
