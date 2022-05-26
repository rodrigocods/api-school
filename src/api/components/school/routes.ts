import { Router } from 'express';

import { IComponentRoutes } from '../helper';

import { SchoolController } from './controller';

export class SchoolRoutes implements IComponentRoutes<SchoolController> {
	readonly name: string = 'school';
	readonly controller: SchoolController = new SchoolController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readSchools);

		// this.router.get('/:schoolID', this.controller.readSchool);

		this.router.post('/', this.controller.createSchool);

		// this.router.put('/:schoolID', this.controller.updateSchool);

		// this.router.delete('/:schoolID', this.controller.deleteSchool);
	}
}
