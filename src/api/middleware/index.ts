import * as compression from 'compression';
import * as cors from 'cors';
import helmet from 'helmet';

import { json, Request, Response, Router } from 'express';

import { env } from '../../config/globals';

/**
 * Init Express middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerMiddleware(router: Router): void {
	router.use(helmet());

	if (env.NODE_ENV === 'development') {
		router.use(cors({ origin: '*' }));
	} else {
		router.use(cors({ origin: ['http://localhost:' + env.NODE_PORT] }));
	}

	router.use(json());
	router.use(compression());
}

/**
 * Init Express error middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerErrorMiddleware(router: Router): void {
	router.use((error, req: Request, res: Response, next) => {
		res.status(500).json({"error": "Failed in server"});
	})
}
