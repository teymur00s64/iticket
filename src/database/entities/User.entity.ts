import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { UserGender, UserRole } from 'src/shared/enum/user.enum';

import * as bcrypt from 'bcrypt';

@Entity()
export class User extends CommonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birthDate: Date;

  @Column()
  number:string;

  @Column({
    type: 'enum',
    enum: UserGender,
  })
  gender: UserGender;

  @Column({ nullable: true })
  activationToken: string;

  @Column({ nullable: true })
  activationExpire: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
  })
  roles: UserRole[];

  @BeforeInsert()
  beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
