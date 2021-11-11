import { Controller, Get, Param } from '@nestjs/common';
import { FindByCRMService } from './findByCRM.service';

@Controller()
export class FindByCRMController {
  constructor(private readonly findByCRMService: FindByCRMService) {}
  @Get('medicos/crm/:crm')
  findByCRM(@Param('crm') crm: number) {
    return this.findByCRMService.findByCRM(crm);
  }
}
