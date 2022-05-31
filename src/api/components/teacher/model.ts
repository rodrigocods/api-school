import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../school/model';

@Entity()
export class Teacher {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		length: 80
	})
	public name: string;

    @Column({
		length: 100,
		unique: true
	})
    public email: string;

	@Column({
		length: 100
	})
    public password: string;

	@ManyToOne(() => School, (school) => school.teachers)
	@JoinColumn({ name: "school_id" })
	school: School
}
