import { json, Request, Response, Router } from 'express';

/**
 * Init Express middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerMiddleware(router: Router): void {
	router.use(json());
}

/**
 * Init Express error middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerErrorMiddleware(router: Router): void {
	router.use((error, req: Request, res: Response, next) => {
		console.log(error);
		res.status(500).json({"error": "Failed in server"});
	})
}
