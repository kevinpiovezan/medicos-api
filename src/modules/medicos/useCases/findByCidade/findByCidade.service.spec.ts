import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from '../../entities/medico.entity';

import { FindByCidadeService } from './findByCidade.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Especialidades } from '../../../especialidades/entities/especialidades.entity';
import { medicoInMemoryProviders } from '../../repository/inMemory/medico.inMemory.provider';
import { especialidadeInMemoryProviders } from '../../../especialidades/repository/inMemory/especialidades.InMemory.provider';

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

describe('FindByCidadeService', () => {
  let service: FindByCidadeService;

  let medicos: ICreateDTO[];
  const mockRepository = {
    find: jest.fn((cidade) =>
      medicos.find((medico) => medico.localidade === cidade),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        FindByCidadeService,
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

    service = module.get<FindByCidadeService>(FindByCidadeService);

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
  it('should return all medicos by cidade', () => {
    expect(mockRepository.find('São Paulo')).toEqual({
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
    });
  });
});
