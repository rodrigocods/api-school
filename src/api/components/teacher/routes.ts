import { Router } from 'express';
import jwtMiddleware from '../../middleware/jwtMiddleware';

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
		this.router.get('/', jwtMiddleware.verifyJWT, this.controller.readTeachers);

		this.router.get('/:teacherID', jwtMiddleware.verifyJWT, this.controller.readTeacher);

		this.router.post('/', jwtMiddleware.verifyJWT, this.controller.createTeacher);

		this.router.put('/:teacherID', jwtMiddleware.verifyJWT, this.controller.updateTeacher);

		this.router.delete('/:teacherID', jwtMiddleware.verifyJWT, this.controller.deleteTeacher);
	}
}
