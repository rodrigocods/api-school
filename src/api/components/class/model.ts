import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SchoolClass {
	@PrimaryGeneratedColumn({ type: "int" })
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;
}
