import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByCidadeService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByCidade(cidade) {
    const medico = await this.medicoRepository.find({
      localidade: ILike(`%${cidade}%`),
    });
    if (medico.length === 0) {
      throw new HttpException(
        'Nenhum médico encontrado nessa cidade',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
