import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMedicoDto } from '../../dto/create-medico.dto';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';
import { Especialidades } from '../../../especialidades/entities/especialidades.entity';
import { endereco } from '../../../../shared/infra/utils/axios';

@Injectable()
export class CreateService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
    @Inject('ESPECIALIDADE_REPOSITORY')
    private especialidadeRepository: Repository<Especialidades>,
  ) {}
  async create({
    cep,
    name,
    crm,
    especialidades,
    tel_celular,
    tel_fixo,
  }: CreateMedicoDto) {
    try {
      const alreadyExistsCrm = await this.medicoRepository.findOne({
        crm: crm,
      });
      if (alreadyExistsCrm || String(crm).length !== 7) {
        throw new Error(
          'Já existe um médico com esse CRM ou o CRM digitado não possui 7 digitos',
        );
      }
      if (name.length > 120) {
        throw new Error('Nome deve conter no máximo 120 caracteres');
      }
      const medico = await this.medicoRepository.create({
        cep,
        crm,
        name,
        tel_celular,
        tel_fixo,
      });
      const especialidade = (await this.especialidadeRepository.findByIds(
        especialidades,
      )) as Especialidades[];
      if (especialidade.length < 2) {
        throw new Error('Médico deve conter ao menos duas especialidades');
      }
      medico.especialidades = especialidade;
      const { uf, localidade, logradouro, bairro } = await endereco(cep);
      medico.uf = uf;
      medico.localidade = localidade;
      medico.bairro = bairro;
      medico.logradouro = logradouro;
      await this.medicoRepository.save(medico);
      return medico;
    } catch (error) {
      throw new HttpException(
        `${error ? error.message : 'Erro ao cadastrar médico'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
