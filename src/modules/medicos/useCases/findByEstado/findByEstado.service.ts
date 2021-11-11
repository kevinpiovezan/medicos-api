import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByEstadoService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByEstado(estado) {
    const medico = await this.medicoRepository.find({
      uf: ILike(`%${estado}%`),
    });
    if (medico.length === 0) {
      throw new HttpException(
        'Nenhum médico encontrado nesse estado',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
