import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from '../../entities/medico.entity';

import { CreateService } from './create.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Especialidades } from '../../../especialidades/entities/especialidades.entity';
import { medicoInMemoryProviders } from '../../repository/inMemory/medico.inMemory.provider';
import { especialidadeInMemoryProviders } from '../../../especialidades/repository/inMemory/especialidades.InMemory.provider';
import { CreateMedicoDto } from '../../dto/create-medico.dto';

describe('CreateService', () => {
  let service: CreateService;
  let medicos: CreateMedicoDto[];
  const mockRepository = {
    create: jest.fn().mockImplementation(function (dto) {
      let alreadyExistsCrm;
      for (let i = 0; i < medicos.length; i++) {
        alreadyExistsCrm = dto.crm === medicos[i].crm;
      }
      if (alreadyExistsCrm)
        return 'Já existe um médico com esse CRM ou o CRM digitado não possui 7 digitos';
      const bigName = dto.name.length > 120;
      if (bigName) return 'Nome deve conter no máximo 120 caracteres';
      const especialidades = dto.especialidades;
      if (especialidades.length < 2)
        return 'Médico deve conter ao menos duas especialidades';
      if (dto.cep.length !== 8 || dto.cep.match(/[\D+]/g))
        return 'Cep deve conter apenas números e ter 8 caracteres';
      medicos.push(dto);
      return dto;
    }),
    save: jest
      .fn()
      .mockImplementation((medico) =>
        Promise.resolve({ id: 'randomid', ...medico }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CreateService,
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

    service = module.get<CreateService>(CreateService);
    medicos = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new medico', async () => {
    const dto: CreateMedicoDto = {
      name: 'Mock',
      cep: '01234567',
      crm: 9999999,
      especialidades: [
        '0572239d-b981-4316-9fad-f1fbe70a58f1',
        '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
      ],
      tel_celular: 12345678,
      tel_fixo: 1127654321,
    };
    const medico = mockRepository.create(dto);
    expect(medicos[0]).toEqual(dto);
    expect(await mockRepository.save(medico)).toHaveProperty('id');
  });

  it('should not create a new medico if one already exists with the same crm', () => {
    const dto: CreateMedicoDto = {
      name: 'Mock',
      cep: '01234567',
      crm: 9999999,
      especialidades: [
        '0572239d-b981-4316-9fad-f1fbe70a58f1',
        '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
      ],
      tel_celular: 12345678,
      tel_fixo: 1127654321,
    };
    mockRepository.create(dto);
    expect(mockRepository.create(dto)).toEqual(
      'Já existe um médico com esse CRM ou o CRM digitado não possui 7 digitos',
    );
    expect(medicos).toHaveLength(1);
  });
  it('should not create a new medico if name is bigger than 120 char', () => {
    const dto: CreateMedicoDto = {
      name: 'MockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTestingMockTesting',
      cep: '01234567',
      crm: 9999999,
      especialidades: [
        '0572239d-b981-4316-9fad-f1fbe70a58f1',
        '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
      ],
      tel_celular: 12345678,
      tel_fixo: 1127654321,
    };
    expect(mockRepository.create(dto)).toEqual(
      'Nome deve conter no máximo 120 caracteres',
    );
    expect(medicos).toHaveLength(0);
  });
  it('should not create a new medico if it has less than 2 especialidades', () => {
    const dto: CreateMedicoDto = {
      name: 'Mock',
      cep: '01234567',
      crm: 9999999,
      especialidades: ['0572239d-b981-4316-9fad-f1fbe70a58f1'],
      tel_celular: 12345678,
      tel_fixo: 1127654321,
    };
    expect(mockRepository.create(dto)).toEqual(
      'Médico deve conter ao menos duas especialidades',
    );
    expect(medicos).toHaveLength(0);
  });
  it('should not create a new medico if cep contains more/less than 8 char, and if contains anything diffente than numbers', () => {
    const dto: CreateMedicoDto = {
      name: 'Mock',
      cep: '11111111a',
      crm: 9999999,
      especialidades: [
        '0572239d-b981-4316-9fad-f1fbe70a58f1',
        '4bbbe99b-c986-43f3-9e7d-5dde92e6dcd4',
      ],
      tel_celular: 12345678,
      tel_fixo: 1127654321,
    };
    expect(mockRepository.create(dto)).toEqual(
      'Cep deve conter apenas números e ter 8 caracteres',
    );
    expect(medicos).toHaveLength(0);
  });
});
