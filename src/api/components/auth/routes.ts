import { Router, Request } from 'express';

import { IComponentRoutes } from '../helper';

import { AuthController } from './controller';

export class AuthRoutes implements IComponentRoutes<AuthController> {
	readonly name: string = 'auth';
	readonly controller: AuthController = new AuthController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.post('/login', this.controller.login);
	}
}
