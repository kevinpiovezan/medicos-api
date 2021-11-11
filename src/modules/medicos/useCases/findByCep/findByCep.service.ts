import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByCepService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByCep(cep) {
    const medico = await this.medicoRepository.find({ cep: ILike(`%${cep}%`) });
    if (medico.length === 0) {
      throw new HttpException(
        'Nenhum médico encontrado nesse cep',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
