import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { StringUtility } from '../../../utility/stringUtility';
import { School } from './school';
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
	readSchools = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const Schools: Array<School> = await this.repo.find();

			return res.json(Schools);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read School
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	readSchool = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { schoolID } = req.params;

			const School = await this.repo.find({
				where: {
					id: +schoolID
				}
			});

			return res.json(School);
		} catch (err) {
			return next(err);
		}
	}

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
			
			const school: School = this.repo.create({ name });

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
	updateSchool = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { schoolID } = req.params;
			const { name } = req.body;

			if (!schoolID) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const school: School = this.repo.create({"name": name});

			const result = await this.repo.update(+schoolID, school);

			if(result.affected === 0) {
				return res.status(404).json({error: 'School not found'});
			}

			school.id = +schoolID;

			return res.json([school]);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete School
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	deleteSchool = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { schoolID } = req.params;

			if (!schoolID || !StringUtility.isJustNumber(schoolID)) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const result = await this.repo.delete(+schoolID);

			if(result.affected === 0) {
				return res.status(404).json({ error: 'School not found' });
			}

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}
}
