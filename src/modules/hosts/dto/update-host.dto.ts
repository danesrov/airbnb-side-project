// src/hosts/dto/update-host.dto.ts
import { IsOptional, IsNumber, Min, Max, IsDateString } from 'class-validator';

export class UpdateHostDto {
  @IsOptional()
  @IsNumber()
  @Min(0) @Max(5)
  calificacion_promedio?: number | null;

  @IsOptional()
  @IsDateString()
  fecha_registro?: string;
}
