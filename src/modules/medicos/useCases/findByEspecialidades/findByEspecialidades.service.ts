import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

interface IEspecialidades {
  medico_id: string;
}

@Injectable()
export class FindByEspecialidadesService {
  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}
  async findByEspecialidades(especialidades) {
    const connection = await getConnection();
    const especialidade: IEspecialidades[] = await connection.query(
      `SELECT distinct medico_id from medicos m join medicos_especialidades me WHERE me.especialidade_id = '${especialidades}' and me.medico_id IS NOT NULL;`,
    );
    const medico = async () => {
      const medicos = [];
      for (let i = 0; i < especialidade.length; i++) {
        const foundMedico = await this.medicoRepository.findOne({
          id: especialidade[i].medico_id,
        });
        if (foundMedico) medicos.push(foundMedico);
      }
      return medicos;
    };
    const allMedicos = await medico();
    if (allMedicos.length <= 0) {
      throw new HttpException(
        'Nenhum médico encontrado com essa especialidade',
        HttpStatus.NOT_FOUND,
      );
    }
    return allMedicos;
  }
}
