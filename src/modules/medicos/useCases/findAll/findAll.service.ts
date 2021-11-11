import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class FindAllService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findAll() {
    try {
      return this.medicoRepository.find();
    } catch (error) {
      throw new HttpException(
        `${error ? error.message : 'Erro ao localizar médicos'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
