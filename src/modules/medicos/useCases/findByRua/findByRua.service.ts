import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindByRuaService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByRua(rua) {
    const medico = await this.medicoRepository.find({
      logradouro: ILike(`%${rua}%`),
    });
    if (medico.length === 0) {
      throw new HttpException(
        'Nenhum médico encontrado nessa rua',
        HttpStatus.NOT_FOUND,
      );
    }
    return medico;
  }
}
