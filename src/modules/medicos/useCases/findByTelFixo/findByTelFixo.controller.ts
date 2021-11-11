import { Controller, Get, Param } from '@nestjs/common';
import { FindByTelFixoService } from './findByTelFixo.service';

@Controller()
export class FindByTelFixoController {
  constructor(private readonly findByTelFixoService: FindByTelFixoService) {}
  @Get('medicos/telfixo/:tel')
  findByTelCel(@Param('tel') tel: number) {
    return this.findByTelFixoService.findByTelFixo(tel);
  }
}
