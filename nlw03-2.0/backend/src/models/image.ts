import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orfanato } from './orfanato';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  path!: string;

  @ManyToOne(() => Orfanato, (orphanage) => orphanage.imagens)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage!: Orfanato;
}
