import { createConnection } from 'typeorm';

export const databaseMockProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        port: 3306,
        host: 'localhost',
        username: 'gcb',
        password: 'gcb',
        database: 'clinica',
        entities: [__dirname + '../../../../**/modules/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
  },
];
