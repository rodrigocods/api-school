import { Router } from 'express';

import { IComponentRoutes } from '../helper';

import { StudentController } from './controller';

export class StudentRoutes implements IComponentRoutes<StudentController> {
	readonly name: string = 'student';
	readonly controller: StudentController = new StudentController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readStudents);

		this.router.get('/:studentID', this.controller.readStudent);

		this.router.post('/', this.controller.createStudent);

		this.router.put('/:studentID', this.controller.updateStudent);

		this.router.delete('/:studentID', this.controller.deleteStudent);
	}
}
