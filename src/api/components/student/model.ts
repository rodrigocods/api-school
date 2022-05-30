import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		length: 100
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

	@Column({
		type: "int"
	})
	public school_id: number;
}
