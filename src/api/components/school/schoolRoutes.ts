import { Router } from 'express';
import jwtMiddleware from '../../middleware/jwtMiddleware';

import { IComponentRoutes } from '../helper';

import { SchoolController } from './schoolController';

export class SchoolRoutes implements IComponentRoutes<SchoolController> {
	readonly name: string = 'school';
	readonly controller: SchoolController = new SchoolController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/',  jwtMiddleware.verifyJWT, this.controller.readSchools);

		this.router.get('/:schoolID', jwtMiddleware.verifyJWT, this.controller.readSchool);

		// this.router.post('/', jwtMiddleware.verifyJWT, this.controller.createSchool);

		this.router.put('/:schoolID', jwtMiddleware.verifyJWT, this.controller.updateSchool);

		// this.router.delete('/:schoolID', jwtMiddleware.verifyJWT, this.controller.deleteSchool);
	}
}
