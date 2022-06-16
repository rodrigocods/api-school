import { Router } from 'express';
import jwtMiddleware from '../../middleware/jwtMiddleware';

import { IComponentRoutes } from '../helper';

import { SchoolClassController } from './schoolClassController';

export class SchoolClassRoutes implements IComponentRoutes<SchoolClassController> {
	readonly name: string = 'schoolClass';
	readonly controller: SchoolClassController = new SchoolClassController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', jwtMiddleware.verifyJWT, this.controller.readSchoolClasses);

		this.router.get('/:schoolClassID', jwtMiddleware.verifyJWT, this.controller.readSchoolClass);

		this.router.post('/', jwtMiddleware.verifyJWT, this.controller.createSchoolClass);

		this.router.put('/:schoolClassID', jwtMiddleware.verifyJWT, this.controller.updateSchoolClass);

		this.router.delete('/:schoolClassID', jwtMiddleware.verifyJWT, this.controller.deleteSchoolClass);
	}
}
