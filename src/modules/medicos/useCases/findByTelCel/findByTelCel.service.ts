import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByTelCelService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByTelCel(tel) {
    const medico = await this.medicoRepository.findOne({
      tel_celular: tel,
    });
    if (!medico) {
      throw new HttpException(
        'Nenhum médico encontrado com esse número de celular',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
