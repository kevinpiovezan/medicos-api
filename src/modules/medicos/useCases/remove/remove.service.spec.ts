import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from '../../entities/medico.entity';

import { RemoveService } from './remove.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Especialidades } from '../../../especialidades/entities/especialidades.entity';
import { medicoInMemoryProviders } from '../../repository/inMemory/medico.inMemory.provider';
import { especialidadeInMemoryProviders } from '../../../especialidades/repository/inMemory/especialidades.InMemory.provider';

interface ICreateDTO {
  id: string;
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

describe('RemoveService', () => {
  let service: RemoveService;

  let medicos: ICreateDTO[];
  const mockRepository = {
    remove: jest.fn((id) => {
      const medico = medicos.find((medico) => medico.id === id);
      if (!medico) return;
      const medicoIndex = medicos.findIndex((medico) => medico.id === id);
      medicos.splice(medicoIndex, 1);
      return 'Cadastro de médico excluido com sucesso';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        RemoveService,
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

    service = module.get<RemoveService>(RemoveService);

    medicos = [
      {
        id: 'anyid',
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
  it('should remove a medico by id', () => {
    expect(mockRepository.remove('anyid')).toEqual(
      'Cadastro de médico excluido com sucesso',
    );
  });
  it('should not be able to remove a non existing medico', () => {
    expect(mockRepository.remove('otherid')).toBeUndefined();
  });
});
