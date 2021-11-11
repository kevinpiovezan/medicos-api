import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateMedicoDto } from '../../dto/update-medico.dto';
import { UpdateService } from './update.service';

@Controller()
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}
  @Patch('medicos/:id')
  update(@Param('id') id: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.updateService.update(id, updateMedicoDto);
  }
}
