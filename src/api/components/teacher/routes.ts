import { Router } from 'express';

import { IComponentRoutes } from '../helper';

import { TeacherController } from './controller';

export class TeacherRoutes implements IComponentRoutes<TeacherController> {
	readonly name: string = 'teacher';
	readonly controller: TeacherController = new TeacherController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readTeachers);

		this.router.get('/:teacherID', this.controller.readTeacher);

		this.router.post('/', this.controller.createTeacher);

		this.router.put('/:teacherID', this.controller.updateTeacher);

		this.router.delete('/:teacherID', this.controller.deleteTeacher);
	}
}
