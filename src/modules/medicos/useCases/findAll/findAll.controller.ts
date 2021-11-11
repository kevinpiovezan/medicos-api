import { Controller, Get } from '@nestjs/common';
import { FindAllService } from './findAll.service';

@Controller()
export class FindAllController {
  constructor(private readonly findAllService: FindAllService) {}
  @Get('medicos')
  findAll() {
    return this.findAllService.findAll();
  }
}
