import { Router } from 'express';
import jwtMiddleware from '../../middleware/jwtMiddleware';

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
		this.router.get('/', jwtMiddleware.verifyJWT, this.controller.readRegistrations);

		this.router.get('/:registrationID', jwtMiddleware.verifyJWT, this.controller.readRegistration);

		this.router.post('/', jwtMiddleware.verifyJWT, this.controller.createRegistration);

		this.router.put('/:registrationID', jwtMiddleware.verifyJWT, this.controller.updateRegistration);

		this.router.delete('/:registrationID', jwtMiddleware.verifyJWT, this.controller.deleteRegistration);
	}
}
