import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FindAllService } from '../src/modules/medicos/useCases/findAll/findAll.service';
import { FindAllController } from '../src/modules/medicos/useCases/findAll/findAll.controller';
import { medicoProviders } from '../src/modules/medicos/repository/implementation/medicos.provider';
import { especialidadeProviders } from '../src/modules/especialidades/repository/implementation/especialidades.provider';
import { CreateService } from '../src/modules/medicos/useCases/create/create.service';
import { CreateController } from '../src/modules/medicos/useCases/create/create.controller';
import { FindOneService } from '../src/modules/medicos/useCases/findOne/findOne.service';
import { FindOneController } from '../src/modules/medicos/useCases/findOne/findOne.controller';
import { databaseMockProviders } from '../src/shared/infra/typeorm/mockDatabase';
import { FindByNameController } from '../src/modules/medicos/useCases/findByName/findByName.controller';
import { FindByNameService } from '../src/modules/medicos/useCases/findByName/findByName.service';
import { RemoveService } from '../src/modules/medicos/useCases/remove/remove.service';
import { RemoveController } from '../src/modules/medicos/useCases/remove/remove.controller';
import { UpdateService } from '../src/modules/medicos/useCases/update/update.service';
import { UpdateController } from '../src/modules/medicos/useCases/update/update.controller';
import { FindByBairroService } from '../src/modules/medicos/useCases/findByBairro/findByBairro.service';
import { FindByBairroController } from '../src/modules/medicos/useCases/findByBairro/findByBairro.controller';
import { FindByCepService } from '../src/modules/medicos/useCases/findByCep/findByCep.service';
import { FindByCepController } from '../src/modules/medicos/useCases/findByCep/findByCep.controller';
import { FindByCidadeService } from '../src/modules/medicos/useCases/findByCidade/findByCidade.service';
import { FindByCidadeController } from '../src/modules/medicos/useCases/findByCidade/findByCidade.controller';
import { FindByCRMService } from '../src/modules/medicos/useCases/findByCRM/findByCRM.service';
import { FindByCRMController } from '../src/modules/medicos/useCases/findByCRM/findByCRM.controller';
import { FindByEspecialidadesService } from '../src/modules/medicos/useCases/findByEspecialidades/findByEspecialidades.service';
import { FindByEspecialidadesController } from '../src/modules/medicos/useCases/findByEspecialidades/findByEspecialidades.controller';
import { FindByEstadoService } from '../src/modules/medicos/useCases/findByEstado/findByEstado.service';
import { FindByEstadoController } from '../src/modules/medicos/useCases/findByEstado/findByEstado.controller';
import { FindByRuaService } from '../src/modules/medicos/useCases/findByRua/findByRua.service';
import { FindByRuaController } from '../src/modules/medicos/useCases/findByRua/findByRua.controller';
import { FindByTelCelService } from '../src/modules/medicos/useCases/findByTelCel/findByTelCel.service';
import { FindByTelCelController } from '../src/modules/medicos/useCases/findByTelCel/findByTelCel.controller';
import { FindByTelFixoService } from '../src/modules/medicos/useCases/findByTelFixo/findByTelFixo.service';
import { FindByTelFixoController } from '../src/modules/medicos/useCases/findByTelFixo/findByTelFixo.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        FindAllService,
        CreateService,
        FindOneService,
        FindByNameService,
        UpdateService,
        RemoveService,
        FindByBairroService,
        FindByCepService,
        FindByCidadeService,
        FindByCRMService,
        FindByEspecialidadesService,
        FindByEstadoService,
        FindByRuaService,
        FindByTelCelService,
        FindByTelFixoService,
        ...medicoProviders,
        ...especialidadeProviders,
        ...databaseMockProviders,
      ],
      controllers: [
        FindAllController,
        CreateController,
        FindOneController,
        FindByNameController,
        FindByBairroController,
        FindByCepController,
        FindByCRMController,
        FindByCidadeController,
        FindByEspecialidadesController,
        FindByEstadoController,
        FindByRuaController,
        FindByTelCelController,
        FindByTelFixoController,
        UpdateController,
        RemoveController,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/medicos (GET)', () => {
    return request(app.getHttpServer()).get('/medicos').expect(200);
  });
  it('/medicos (POST)', () => {
    return request(app.getHttpServer())
      .post('/medicos')
      .send({
        name: 'e2e Mock',
        crm: 9999999,
        cep: '04612002',
        tel_fixo: 1123456789,
        tel_celular: 987654321,
        especialidades: [
          '0572239d-b981-4316-9fad-f1fbe70a58f1',
          '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
        ],
      })
      .expect(201);
  });
  it('/medicos/name/:name (GET)', async () => {
    const medico = await request(app.getHttpServer()).get('/medicos/name/Mock');
    id = medico.body[0].id;
    return request(app.getHttpServer()).get('/medicos/name/Mock').expect(200);
  });
  it('/medicos/bairro/:bairro (GET)', async () => {
    return request(app.getHttpServer()).get('/medicos/bairro/vila').expect(200);
  });
  it('/medicos/:id (GET)', async () => {
    return request(app.getHttpServer()).get(`/medicos/${id}`).expect(200);
  });
  it('/medicos/cep/:cep (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medicos/cep/04612002')
      .expect(200);
  });
  it('/medicos/cidade/:cidade (GET)', async () => {
    return request(app.getHttpServer()).get('/medicos/cidade/sao').expect(200);
  });
  it('/medicos/crm/:crm (GET)', async () => {
    return request(app.getHttpServer()).get('/medicos/crm/9999999').expect(200);
  });
  it('/medicos/especialidades/:especialidades (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medicos/especialidades/0572239d-b981-4316-9fad-f1fbe70a58f1')
      .expect(200);
  });
  it('/medicos/estado/:estado (GET)', async () => {
    return request(app.getHttpServer()).get('/medicos/estado/sp').expect(200);
  });
  it('/medicos/rua/:rua (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medicos/rua/baronesa')
      .expect(200);
  });
  it('/medicos/telcel/:tel (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medicos/telcel/987654321')
      .expect(200);
  });
  it('/medicos/telfixo/:tel (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medicos/telfixo/1123456789')
      .expect(200);
  });
  it('/medicos/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch(`/medicos/${id}`)
      .send({ tel_celular: 987654322 })
      .expect(200);
  });
  it('/medicos/:id (DELETE)', async () => {
    return request(app.getHttpServer()).delete(`/medicos/${id}`).expect(200);
  });
});
