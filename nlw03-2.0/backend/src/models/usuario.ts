import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryColumn({ name: 'cdusuario', type: 'text' })
  cdUsuario!: string;

  @Column({ name: 'nmUsuario', type: 'text', nullable: false })
  nmUsuario!: string;

  @Column({ name: 'deemail', type: 'text', nullable: false })
  deEmail!: string;

  @Column({ name: 'desenha', type: 'text', nullable: false })
  deSenha!: string;
}
