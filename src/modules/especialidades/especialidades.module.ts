import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infra/typeorm/database.module';
import { especialidadeProviders } from './repository/implementation/especialidades.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...especialidadeProviders],
})
export class EspecialidadesModule {}
