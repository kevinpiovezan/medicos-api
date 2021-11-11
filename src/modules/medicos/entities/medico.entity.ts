import { Especialidades } from '../../especialidades/entities/especialidades.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column()
  crm: number;

  @Column()
  tel_fixo: number;

  @Column()
  tel_celular: number;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  bairro: string;

  @Column()
  localidade: string;

  @Column()
  uf: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Especialidades)
  @JoinTable({
    name: 'medicos_especialidades',
    joinColumns: [{ name: 'medico_id' }],
    inverseJoinColumns: [{ name: 'especialidade_id' }],
  })
  especialidades: Especialidades[];
}
