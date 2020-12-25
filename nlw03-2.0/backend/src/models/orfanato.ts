import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JsonName } from '../util/jsonname';
import { Image } from './image';

@Entity({ name: 'orfanato' })
export class Orfanato {
  @JsonName('id')
  @PrimaryGeneratedColumn({ name: 'cdorfanato', type: 'int' })
  cdOrfanato!: number;

  @JsonName('nome')
  @Column({ name: 'name', type: 'text', nullable: false })
  nmOrfanato!: string;

  @JsonName('latitude')
  @Column({ name: 'latitude', type: 'text', nullable: false })
  deLatitude!: string;

  @JsonName('longitude')
  @Column({ name: 'delongitude', type: 'text', nullable: false })
  deLongitude!: string;

  @JsonName('sobre')
  @Column({ name: 'desobre', type: 'text', nullable: false })
  deSobre!: string;

  @JsonName('instructions')
  @Column({ name: 'deinstructions', type: 'text', nullable: false })
  deInstrucao!: string;

  @JsonName('abertura')
  @Column({ name: 'deabertura', type: 'text', nullable: false })
  deAbertura!: string;

  @JsonName('finais_de_semana')
  @Column({ name: 'deabertofinds', type: 'boolean', nullable: false })
  deAbertoFinds!: boolean;

  @JsonName('imagens')
  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'cdorfanato' })
  imagens!: Image[];
}
