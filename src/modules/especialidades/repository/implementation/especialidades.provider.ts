import { Connection } from 'typeorm';
import { Especialidades } from '../../entities/especialidades.entity';

export const especialidadeProviders = [
  {
    provide: 'ESPECIALIDADE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Especialidades),
    inject: ['DATABASE_CONNECTION'],
  },
];
