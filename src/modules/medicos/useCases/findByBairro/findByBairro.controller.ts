import { Controller, Get, Param } from '@nestjs/common';
import { FindByBairroService } from './findByBairro.service';

@Controller()
export class FindByBairroController {
  constructor(private readonly findAByBairroService: FindByBairroService) {}
  @Get('medicos/bairro/:bairro')
  findByBairro(@Param('bairro') bairro: string) {
    return this.findAByBairroService.findByBairro(bairro);
  }
}
