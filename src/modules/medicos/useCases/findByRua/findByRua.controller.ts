import { Controller, Get, Param } from '@nestjs/common';
import { FindByRuaService } from './findByRua.service';

@Controller()
export class FindByRuaController {
  constructor(private readonly findByRuaService: FindByRuaService) {}
  @Get('medicos/rua/:rua')
  findByRua(@Param('rua') rua: string) {
    return this.findByRuaService.findByRua(rua);
  }
}
