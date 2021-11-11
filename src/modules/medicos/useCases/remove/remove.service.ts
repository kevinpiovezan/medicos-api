import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

@Injectable()
export class RemoveService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async remove(id: string) {
    const medico = await this.medicoRepository.findOne(id);
    if (!medico) {
      throw new HttpException(
        'Nenhum médico encontrado com esse ID',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.medicoRepository.softDelete(id);
    return { message: 'Cadastro de médico excluido com sucesso' };
  }
}
