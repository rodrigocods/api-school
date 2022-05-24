import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class School {
	constructor(name: string, id: number = null) {
		this.name = name;
		this.id = id;
	}

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;
}
