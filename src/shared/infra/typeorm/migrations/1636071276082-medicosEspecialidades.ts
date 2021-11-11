import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class medicosEspecialidades1636071276082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicos_especialidades',
        columns: [
          {
            name: 'medico_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'especialidade_id',
            type: 'varchar',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKCMedicoEspecialidade',
            referencedTableName: 'medicos',
            referencedColumnNames: ['id'],
            columnNames: ['medico_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKespecialidadeMedico',
            referencedTableName: 'especialidades',
            referencedColumnNames: ['id'],
            columnNames: ['especialidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'medicos_especialidades',
      'FKespecialidadeMedico',
    );
    await queryRunner.dropForeignKey(
      'medicos_especialidades',
      'FKCMedicoEspecialidade',
    );
    await queryRunner.dropTable('medicos_especialidades');
  }
}
