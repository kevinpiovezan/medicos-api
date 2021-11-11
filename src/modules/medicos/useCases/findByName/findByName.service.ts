import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByNameService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByName(name) {
    const medico = await this.medicoRepository.find({
      name: ILike(`%${name}%`),
    });
    if (medico.length === 0) {
      throw new HttpException(
        'Nenhum médico que contenha qualquer um dos nomes fornecidos',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
