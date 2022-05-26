import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class School {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;
}
