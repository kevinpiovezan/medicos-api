import { Controller, Delete, Param } from '@nestjs/common';
import { RemoveService } from './remove.service';

@Controller()
export class RemoveController {
  constructor(private readonly removeService: RemoveService) {}
  @Delete('medicos/:id')
  remove(@Param('id') id: string) {
    return this.removeService.remove(id);
  }
}
