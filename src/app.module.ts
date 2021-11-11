import { Module } from '@nestjs/common';
import { EspecialidadesModule } from './modules/especialidades/especialidades.module';
import { MedicosModule } from './modules/medicos/medicos.module';

@Module({
  imports: [MedicosModule, EspecialidadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
