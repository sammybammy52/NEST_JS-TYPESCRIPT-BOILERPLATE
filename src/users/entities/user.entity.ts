import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;
  
    @Column({ default: true })
    isActive: boolean;

    @Column()
    password: string;
  
}
