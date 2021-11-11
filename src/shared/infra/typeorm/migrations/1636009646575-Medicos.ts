import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Medicos1636009646575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicos',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'crm',
            type: 'int',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'logradouro',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'localidade',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'uf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tel_fixo',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tel_celular',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'Date',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medicos');
  }
}
