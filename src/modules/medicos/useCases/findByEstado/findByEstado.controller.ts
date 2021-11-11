import { Controller, Get, Param } from '@nestjs/common';
import { FindByEstadoService } from './findByEstado.service';

@Controller()
export class FindByEstadoController {
  constructor(private readonly findByEstadoService: FindByEstadoService) {}
  @Get('medicos/estado/:estado')
  findByEstado(@Param('estado') estado: string) {
    return this.findByEstadoService.findByEstado(estado);
  }
}
