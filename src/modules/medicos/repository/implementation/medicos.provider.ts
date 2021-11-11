import { Connection } from 'typeorm';
import { Medico } from '../../entities/medico.entity';

export const medicoProviders = [
  {
    provide: 'MEDICO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Medico),
    inject: ['DATABASE_CONNECTION'],
  },
];
