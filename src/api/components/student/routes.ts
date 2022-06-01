import { Router } from 'express';
import jwtMiddleware from '../../middleware/jwtMiddleware';

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
		this.router.get('/', jwtMiddleware.verifyJWT, this.controller.readStudents);

		this.router.get('/:studentID', jwtMiddleware.verifyJWT, this.controller.readStudent);

		this.router.post('/', jwtMiddleware.verifyJWT, this.controller.createStudent);

		this.router.put('/:studentID', jwtMiddleware.verifyJWT, this.controller.updateStudent);

		this.router.delete('/:studentID', jwtMiddleware.verifyJWT, this.controller.deleteStudent);
	}
}
