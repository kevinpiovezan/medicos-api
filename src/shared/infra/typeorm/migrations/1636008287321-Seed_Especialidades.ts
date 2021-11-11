import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Especialidades } from '../../../../modules/especialidades/entities/especialidades.entity';

export class SeedEspecialidades1636008287321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const alergologia = getRepository(Especialidades).create({
      name: 'Alergologia',
    });
    await getRepository(Especialidades).save(alergologia);
    const angiologia = getRepository(Especialidades).create({
      name: 'Angiologia',
    });
    await getRepository(Especialidades).save(angiologia);
    const bucoMaxilo = getRepository(Especialidades).create({
      name: 'Buco Maxilo',
    });
    await getRepository(Especialidades).save(bucoMaxilo);
    const cardiologiaClinica = getRepository(Especialidades).create({
      name: 'Cardiologia Clinica',
    });
    await getRepository(Especialidades).save(cardiologiaClinica);
    const cardiologiaInfantil = getRepository(Especialidades).create({
      name: 'Cardiologia Infantil',
    });
    await getRepository(Especialidades).save(cardiologiaInfantil);
    const cirurgiaCabecaEPescoco = getRepository(Especialidades).create({
      name: 'Cirurgia Cabeca e Pescoco',
    });
    await getRepository(Especialidades).save(cirurgiaCabecaEPescoco);
    const cirurgiaCardiaca = getRepository(Especialidades).create({
      name: 'Cirurgia Cardiaca',
    });
    await getRepository(Especialidades).save(cirurgiaCardiaca);
    const cirurgiaTorax = getRepository(Especialidades).create({
      name: 'Cirurgia de Torax',
    });
    await getRepository(Especialidades).save(cirurgiaTorax);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
