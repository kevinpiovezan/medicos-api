import { Controller, Get, Param } from '@nestjs/common';
import { FindByCepService } from './findByCep.service';

@Controller()
export class FindByCepController {
  constructor(private readonly findByCepService: FindByCepService) {}
  @Get('medicos/cep/:cep')
  findByCep(@Param('cep') cep: string) {
    return this.findByCepService.findByCep(cep);
  }
}
