import { Router } from 'express';

import { IComponentRoutes } from '../helper';

import { RegistrationController } from './controller';

export class RegistrationRoutes implements IComponentRoutes<RegistrationController> {
	readonly name: string = 'registration';
	readonly controller: RegistrationController = new RegistrationController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readRegistrations);

		this.router.get('/:registrationID', this.controller.readRegistration);

		this.router.post('/', this.controller.createRegistration);

		this.router.put('/:registrationID', this.controller.updateRegistration);

		this.router.delete('/:registrationID', this.controller.deleteRegistration);
	}
}
