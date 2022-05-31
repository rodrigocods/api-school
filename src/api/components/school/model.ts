import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/model';

@Entity()
export class School {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;

	@OneToMany(() => Student, (student) => student.school, { eager: true })
    students: Student[]
}
