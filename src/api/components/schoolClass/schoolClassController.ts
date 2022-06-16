import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { StringUtility } from '../../../utility/stringUtility';
import { SchoolClass } from './schoolClass';
export class SchoolClassController {
	private readonly repo: Repository<SchoolClass> = AppDataSource.getRepository(SchoolClass);

	/**
	 * Read SchoolClasss
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	async readSchoolClasses(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const SchoolClasses: Array<SchoolClass> = await this.repo.find();

			return res.json(SchoolClasses);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read SchoolClass
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	async readSchoolClass(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { schoolClassID } = req.params;

			const SchoolClass = await this.repo.find({
				where: {
					id: +schoolClassID
				}
			});

			return res.json(SchoolClass);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create SchoolClass
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	async createSchoolClass(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { name } = req.body;
			
			const schoolClass: SchoolClass = this.repo.create({ name });

			const newSchoolClass = await this.repo.insert(schoolClass);

			schoolClass.id = newSchoolClass.identifiers[0].id;

			return res.json(schoolClass);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update SchoolClass
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	async updateSchoolClass(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { schoolClassID } = req.params;
			const { name } = req.body;

			if(!schoolClassID) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const schoolClass: SchoolClass = this.repo.create({"name": name});

			const result = await this.repo.update(+schoolClassID, schoolClass);

			if(result.affected === 0) {
				return res.status(404).json({error: 'Class not found'});
			}

			schoolClass.id = +schoolClassID;

			return res.json([schoolClass]);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete SchoolClass
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	async deleteSchoolClass(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { schoolClassID } = req.params;

			if(!schoolClassID || !StringUtility.isJustNumber(schoolClassID)) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const result = await this.repo.delete(+schoolClassID);

			if(result.affected === 0) {
				return res.status(404).json({ error: 'Class not found' });
			}

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}
}
