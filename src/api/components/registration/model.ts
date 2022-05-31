import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../school/model';
import { SchoolClass } from '../schoolClass/model';
import { Student } from '../student/model';

@Entity()
export class Registration {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		length: 255
	})
	public registration_number: string;

	@Column({ type: "date"})
	public registration_date: string;

	@ManyToOne(() => School, (school) => school.registrations)
	@JoinColumn({ name: "school_id" })
	school: School

	@OneToOne(() => Student)
	@JoinColumn({ name: "student_id" })
	student: Student

	@ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.registrations)
	@JoinColumn({ name: "school_class_id" })
	schoolClass: SchoolClass
}
