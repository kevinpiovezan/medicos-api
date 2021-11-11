import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateMedicoDto } from '../../dto/update-medico.dto';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';
import { Especialidades } from '../../../especialidades/entities/especialidades.entity';
import { endereco } from '../../../../shared/infra/utils/axios';

@Injectable()
export class UpdateService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
    @Inject('ESPECIALIDADE_REPOSITORY')
    private especialidadeRepository: Repository<Especialidades>,
  ) {}
  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    const { cep, especialidades, tel_celular, tel_fixo, crm, name } =
      updateMedicoDto;
    const medico = await this.medicoRepository.findOne(id);
    if (!medico) {
      throw new HttpException('Médico não encontrado', HttpStatus.NOT_FOUND);
    }
    if (crm || name) {
      throw new HttpException(
        'CRM e Nome não são mutáveis',
        HttpStatus.NOT_FOUND,
      );
    }
    if (especialidades) {
      const especialidade = await this.especialidadeRepository.findByIds(
        especialidades,
      );
      if (especialidade.length < 2) {
        throw new HttpException(
          'Médico deve conter ao menos duas especialidades',
          HttpStatus.BAD_REQUEST,
        );
      }
      medico.especialidades = especialidade;
      await this.medicoRepository.save(medico);
    }
    if (cep) {
      medico.cep = cep;
      try {
        const { uf, localidade, logradouro, bairro } = await endereco(cep);
        medico.uf = uf;
        medico.localidade = localidade;
        medico.bairro = bairro;
        medico.logradouro = logradouro;
        await this.medicoRepository.save(medico);
      } catch (error) {
        throw new HttpException(
          `${error ? error.message : 'Erro ao atualizar médico'}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (tel_fixo) {
      try {
        medico.tel_fixo = tel_fixo;
        await this.medicoRepository.save(medico);
      } catch (error) {
        throw new HttpException(
          `${error ? error.message : 'Erro ao atualizar médico'}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (tel_celular) {
      try {
        medico.tel_celular = tel_celular;
        await this.medicoRepository.save(medico);
      } catch (error) {
        throw new HttpException(
          `${error ? error.message : 'Erro ao atualizar médico'}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return medico;
  }
}
