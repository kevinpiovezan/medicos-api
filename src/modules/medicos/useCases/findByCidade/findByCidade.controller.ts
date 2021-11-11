import { Controller, Get, Param } from '@nestjs/common';
import { FindByCidadeService } from './findByCidade.service';

@Controller()
export class FindByCidadeController {
  constructor(private readonly findByCidadeService: FindByCidadeService) {}
  @Get('medicos/cidade/:cidade')
  findByCidade(@Param('cidade') cidade: string) {
    return this.findByCidadeService.findByCidade(cidade);
  }
}
