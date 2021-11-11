import { Controller, Get, Param } from '@nestjs/common';
import { FindOneService } from './findOne.service';

@Controller()
export class FindOneController {
  constructor(private readonly findOneService: FindOneService) {}
  @Get('medicos/:id')
  findOne(@Param('id') id: string) {
    return this.findOneService.findOne(id);
  }
}
