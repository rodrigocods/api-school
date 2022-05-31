import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Registration } from '../registration/model';

@Entity()
export class SchoolClass {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;

	@OneToMany(() => Registration, (registration) => registration.school)
    registrations: Registration[]
}
