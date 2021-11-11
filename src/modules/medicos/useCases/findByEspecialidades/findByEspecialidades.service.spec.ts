import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from '../../entities/medico.entity';

import { FindByEspecialidadesService } from './findByEspecialidades.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Especialidades } from '../../../especialidades/entities/especialidades.entity';
import { medicoInMemoryProviders } from '../../repository/inMemory/medico.inMemory.provider';
import { especialidadeInMemoryProviders } from '../../../especialidades/repository/inMemory/especialidades.InMemory.provider';
import validator from 'validator';

interface ICreateDTO {
  name: string;
  cep: string;
  localidade: string;
  uf: string;
  logradouro: string;
  bairro: string;
  crm: number;
  especialidades: string[];
  tel_celular: number;
  tel_fixo: number;
}

describe('FindByEspecialidadeService', () => {
  let service: FindByEspecialidadesService;

  let medicos: ICreateDTO[];
  const mockRepository = {
    validate: jest.fn((especialidades) => validator.isUUID(especialidades)),
    find: jest.fn((especialidades) =>
      medicos.find((medico) =>
        medico.especialidades.find(
          (especialidade) => especialidade === especialidades,
        ),
      ),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        FindByEspecialidadesService,
        {
          provide: getRepositoryToken(Medico),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Especialidades),
          useValue: {},
        },
        ...medicoInMemoryProviders,
        ...especialidadeInMemoryProviders,
      ],
    }).compile();

    service = module.get<FindByEspecialidadesService>(
      FindByEspecialidadesService,
    );

    medicos = [
      {
        name: 'Mock',
        cep: '01234567',
        localidade: 'São Paulo',
        uf: 'SP',
        logradouro: 'Rua abcde',
        bairro: 'bairro legal',
        crm: 9999999,
        especialidades: [
          '0572239d-b981-4316-9fad-f1fbe70a58f1',
          '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
        ],
        tel_celular: 12345678,
        tel_fixo: 1127654321,
      },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a medico by especialidade', () => {
    expect(mockRepository.find('0572239d-b981-4316-9fad-f1fbe70a58f1')).toEqual(
      {
        name: 'Mock',
        cep: '01234567',
        localidade: 'São Paulo',
        uf: 'SP',
        logradouro: 'Rua abcde',
        bairro: 'bairro legal',
        crm: 9999999,
        especialidades: [
          '0572239d-b981-4316-9fad-f1fbe70a58f1',
          '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
        ],
        tel_celular: 12345678,
        tel_fixo: 1127654321,
      },
    );
  });
  it('should not be able to return a medico if Especialidade does not exists on database', () => {
    expect(
      mockRepository.find('5104d018-dafc-4fac-b07d-e2924a67fb3d'),
    ).toBeUndefined();
  });
  it('should not be able to return a medico if Especialidade is not a valid uuid', () => {
    const wrongId = mockRepository.validate('anyid');
    if (!wrongId) expect(wrongId).toBeFalsy();
  });
});
