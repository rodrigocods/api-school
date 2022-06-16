import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Registration } from '../registration/registration';
import { Student } from '../student/student';
import { Teacher } from '../teacher/teacher';

@Entity()
export class School {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;

	@OneToMany(() => Student, (student) => student.school)
    students: Student[]

	@OneToMany(() => Registration, (registration) => registration.school)
    registrations: Registration[]
	
	@OneToMany(() => Teacher, (teacher) => teacher.school)
    teachers: Teacher[]
}
