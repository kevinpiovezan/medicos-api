import { Controller, Post, Body } from '@nestjs/common';
import { CreateMedicoDto } from '../../dto/create-medico.dto';
import { CreateService } from './create.service';

@Controller()
export class CreateController {
  constructor(private readonly createService: CreateService) {}
  @Post('medicos')
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.createService.create(createMedicoDto);
  }
}
