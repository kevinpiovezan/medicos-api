import { Controller, Get, Param } from '@nestjs/common';
import { FindByTelCelService } from './findByTelCel.service';

@Controller()
export class FindByTelCelController {
  constructor(private readonly findByTelCelService: FindByTelCelService) {}
  @Get('medicos/telcel/:tel')
  findByTelCel(@Param('tel') tel: number) {
    return this.findByTelCelService.findByTelCel(tel);
  }
}
