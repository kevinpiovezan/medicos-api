import { IsString, IsNumber } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly crm: number;

  @IsString()
  readonly cep: string;

  @IsNumber()
  readonly tel_fixo: number;

  @IsNumber()
  readonly tel_celular: number;

  @IsString({ each: true })
  readonly especialidades: string[];
}
