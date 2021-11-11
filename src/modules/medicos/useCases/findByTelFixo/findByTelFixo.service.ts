import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByTelFixoService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByTelFixo(tel) {
    const medico = await this.medicoRepository.findOne({ tel_fixo: tel });
    if (!medico) {
      throw new HttpException(
        'Nenhum médico encontrado com esse número de telefone',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
