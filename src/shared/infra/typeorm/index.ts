import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        port: 3306,
        host: 'database',
        username: 'gcb',
        password: 'gcb',
        database: 'clinica',
        entities: [__dirname + '../../../../**/modules/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
  },
];
