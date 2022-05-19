import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class School {
	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		nullable: false,
		unique: true
	})
	public name: string;


	static deserialize(obj: School): School {
		const user: School = new School(obj.id, obj.name);
		return user;
	}

	public static mockTestUser(): School {
		const user = new School(1, 'testSchool');
		return user;
	}
}
