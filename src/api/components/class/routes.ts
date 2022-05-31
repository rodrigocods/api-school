import { Router } from 'express';

import { IComponentRoutes } from '../helper';

import { SchoolClassController } from './controller';

export class SchoolClassRoutes implements IComponentRoutes<SchoolClassController> {
	readonly name: string = 'schoolClass';
	readonly controller: SchoolClassController = new SchoolClassController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readSchoolClasses);

		this.router.get('/:schoolClassID', this.controller.readSchoolClass);

		this.router.post('/', this.controller.createSchoolClass);

		this.router.put('/:schoolClassID', this.controller.updateSchoolClass);

		this.router.delete('/:schoolClassID', this.controller.deleteSchoolClass);
	}
}
