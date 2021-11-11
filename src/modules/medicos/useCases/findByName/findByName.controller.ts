import { Controller, Get, Param } from '@nestjs/common';
import { FindByNameService } from './findByName.service';

@Controller()
export class FindByNameController {
  constructor(private readonly findByNameService: FindByNameService) {}
  @Get('medicos/name/:name')
  findByName(@Param('name') name: string) {
    return this.findByNameService.findByName(name);
  }
}
