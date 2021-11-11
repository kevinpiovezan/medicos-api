import { Controller, Get, Param } from '@nestjs/common';
import { FindByEspecialidadesService } from './findByEspecialidades.service';

@Controller()
export class FindByEspecialidadesController {
  constructor(
    private readonly findByEspecialidadesService: FindByEspecialidadesService,
  ) {}
  @Get('medicos/especialidades/:especialidades')
  findByEspecialidades(@Param('especialidades') especialidades: string) {
    return this.findByEspecialidadesService.findByEspecialidades(
      especialidades,
    );
  }
}
