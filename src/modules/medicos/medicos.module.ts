import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infra/typeorm/database.module';
import { medicoProviders } from './repository/implementation/medicos.provider';
import { especialidadeProviders } from '../especialidades/repository/implementation/especialidades.provider';
import { FindAllService } from './useCases/findAll/findAll.service';
import { FindOneService } from './useCases/findOne/findOne.service';
import { RemoveService } from './useCases/remove/remove.service';
import { UpdateService } from './useCases/update/update.service';
import { CreateService } from './useCases/create/create.service';
import { FindByNameService } from './useCases/findByName/findByName.service';
import { FindByCRMService } from './useCases/findByCRM/findByCRM.service';
import { FindByTelFixoService } from './useCases/findByTelFixo/findByTelFixo.service';
import { FindByTelCelService } from './useCases/findByTelCel/findByTelCel.service';
import { FindByCepService } from './useCases/findByCep/findByCep.service';
import { FindByRuaService } from './useCases/findByRua/findByRua.service';
import { FindByBairroService } from './useCases/findByBairro/findByBairro.service';
import { FindByCidadeService } from './useCases/findByCidade/findByCidade.service';
import { FindByEstadoService } from './useCases/findByEstado/findByEstado.service';
import { FindAllController } from './useCases/findAll/findAll.controller';
import { FindByBairroController } from './useCases/findByBairro/findByBairro.controller';
import { FindByCepController } from './useCases/findByCep/findByCep.controller';
import { FindByCidadeController } from './useCases/findByCidade/findByCidade.controller';
import { FindByCRMController } from './useCases/findByCRM/findByCRM.controller';
import { FindByEstadoController } from './useCases/findByEstado/findByEstado.controller';
import { FindByNameController } from './useCases/findByName/findByName.controller';
import { FindByRuaController } from './useCases/findByRua/findByRua.controller';
import { FindByTelCelController } from './useCases/findByTelCel/findByTelCel.controller';
import { FindByTelFixoController } from './useCases/findByTelFixo/findByTelFixo.controller';
import { FindOneController } from './useCases/findOne/findOne.controller';
import { RemoveController } from './useCases/remove/remove.controller';
import { UpdateController } from './useCases/update/update.controller';
import { CreateController } from './useCases/create/create.controller';
import { FindByEspecialidadesService } from './useCases/findByEspecialidades/findByEspecialidades.service';
import { FindByEspecialidadesController } from './useCases/findByEspecialidades/findByEspecialidades.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    FindByBairroController,
    FindByCepController,
    FindByCidadeController,
    FindByCRMController,
    FindByEstadoController,
    FindByEspecialidadesController,
    FindByNameController,
    FindByRuaController,
    FindByTelCelController,
    FindByTelFixoController,
    FindOneController,
    RemoveController,
    UpdateController,
    CreateController,
    FindAllController,
  ],
  providers: [
    ...medicoProviders,
    ...especialidadeProviders,
    FindAllService,
    FindOneService,
    RemoveService,
    UpdateService,
    CreateService,
    FindByNameService,
    FindByEspecialidadesService,
    FindByCRMService,
    FindByTelFixoService,
    FindByTelCelService,
    FindByCepService,
    FindByRuaService,
    FindByBairroService,
    FindByCidadeService,
    FindByEstadoService,
  ],
})
export class MedicosModule {}
