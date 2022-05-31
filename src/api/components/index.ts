import { Router } from 'express';
import { SchoolClassRoutes } from './schoolClass/routes';
import { SchoolRoutes } from './school/routes';
import { StudentRoutes } from './student/routes';
import { RegistrationRoutes } from './registration/routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}/school`, new SchoolRoutes().router);
	router.use(`${prefix}/student`, new StudentRoutes().router);
	router.use(`${prefix}/schoolClass`, new SchoolClassRoutes().router);
	router.use(`${prefix}/registration`, new RegistrationRoutes().router);
}
