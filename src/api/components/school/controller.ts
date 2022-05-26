import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { School } from './model';
export class SchoolController {
	private readonly repo: Repository<School> = AppDataSource.getRepository(School);

	/**
	 * Read Schools
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	// async readSchools(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	// 	try {
	// 		const Schools: School[] = await this.repo.readAll();

	// 		return res.json(Schools);
	// 	} catch (err) {
	// 		return next(err);
	// 	}
	// }

	/**
	 * Read School
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	// async readSchool(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	// 	try {
	// 		const { SchoolID } = req.params;

	// 		const School: School | undefined = await this.repo.read({
	// 			where: {
	// 				id: +SchoolID
	// 			}
	// 		});

	// 		return res.json(School);
	// 	} catch (err) {
	// 		return next(err);
	// 	}
	// }

	/**
	 * Create School
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	createSchool = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { name } = req.body;

			const existingSchool: Array<School> = await this.repo.find({
				where: {
					name
				}
			});

			if (existingSchool.length > 0) {
				return res.status(400).json({ error: 'School name is already taken' });
			}

			const school: School = new School(
				name
			);

			const newSchool = await this.repo.insert(school);

			school.id = newSchool.identifiers[0].id;

			return res.json(school);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update School
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	// async updateSchool(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	// 	try {
	// 		const { SchoolID } = req.params;
	// 		const { name } = req.body;

	// 		if (!SchoolID) {
	// 			return res.status(400).json({ error: 'Invalid request' });
	// 		}

	// 		const existingSchool: School | undefined = await this.repo.read({
	// 			where: {
	// 				id: +SchoolID
	// 			}
	// 		});

	// 		if (!existingSchool) {
	// 			return res.status(404).json({ error: 'School not found' });
	// 		}

	// 		existingSchool.name = name;

	// 		const updatedSchool: School = await this.repo.save(existingSchool);

	// 		return res.json(updatedSchool);
	// 	} catch (err) {
	// 		return next(err);
	// 	}
	// }

	/**
	 * Delete School
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	// async deleteSchool(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	// 	try {
	// 		const { SchoolID } = req.params;

	// 		const School: School | undefined = await this.repo.read({
	// 			where: {
	// 				id: +SchoolID
	// 			}
	// 		});

	// 		if (!School) {
	// 			return res.status(404).json({ error: 'School not found' });
	// 		}

	// 		await this.repo.delete(School);

	// 		return res.status(204).send();
	// 	} catch (err) {
	// 		return next(err);
	// 	}
	// }
}
