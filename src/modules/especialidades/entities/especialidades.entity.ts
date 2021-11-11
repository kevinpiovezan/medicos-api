import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('especialidades')
class Especialidades {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
export { Especialidades };
