import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByBairroService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByBairro(bairro) {
    const medico = await this.medicoRepository.find({
      bairro: ILike(`%${bairro}%`),
    });
    if (medico.length === 0) {
      throw new HttpException(
        'Nenhum médico encontrado nesse bairro',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
