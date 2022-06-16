import { Router } from 'express';
import { SchoolClassRoutes } from './schoolClass/schoolClassRoutes';
import { SchoolRoutes } from './school/schoolRoutes';
import { StudentRoutes } from './student/studentRoutes';
import { RegistrationRoutes } from './registration/registrationRoutes';
import { TeacherRoutes } from './teacher/teacherRoutes';
import { AuthRoutes } from './auth/authRoutes';

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
	router.use(`${prefix}/teacher`, new TeacherRoutes().router);
	router.use(`${prefix}/registration`, new RegistrationRoutes().router);
	router.use(`${prefix}/auth`, new AuthRoutes().router);
}
