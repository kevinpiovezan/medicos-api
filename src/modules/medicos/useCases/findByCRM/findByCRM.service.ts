import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByCRMService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByCRM(crm) {
    const medico = await this.medicoRepository.findOne({ crm: crm });
    if (!medico) {
      throw new HttpException(
        'Nenhum médico encontrado com esse CRM',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
