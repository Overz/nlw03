import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './Image';
@Entity({ name: 'orphanages' })
export class Orphanage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column({ name: 'name', type: 'text', nullable: false })
  name!: string;

  @Column({ name: 'latitude', type: 'text', nullable: false })
  latitude!: string;

  @Column({ name: 'longitude', type: 'text', nullable: false })
  longitude!: string;

  @Column({ name: 'about', type: 'text', nullable: false })
  about!: string;

  @Column({ name: 'instructions', type: 'text', nullable: false })
  instructions!: string;

  @Column({ name: 'opening_hours', type: 'varchar', nullable: false })
  opening_hours!: string;

  @Column({ name: 'open_on_weekends', type: 'boolean', nullable: false })
  open_on_weekends!: boolean;

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images!: Image[];
}
