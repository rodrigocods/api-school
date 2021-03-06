import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { UtilityService } from '../../../services/utility';
import { Registration } from './model';
import { createHmac } from 'crypto';
import { School } from '../school/model';
import { Student } from '../student/model';
import { SchoolClass } from '../schoolClass/model';
export class RegistrationController {
	private readonly repo: Repository<Registration> = AppDataSource.getRepository(Registration);

	/**
	 * Read Registrations
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	readRegistrations = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const Registrations: Array<Registration> = await this.repo.find();

			return res.json(Registrations);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read Registration
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	readRegistration = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { registrationID } = req.params;

			const Registration = await this.repo.find({
				where: {
					id: +registrationID
				}
			});

			return res.json(Registration);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create Registration
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	createRegistration = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { registration_number, registration_date, student_id, school_id, school_class_id } = req.body;
			
			const registration: Registration = this.repo.create({
                registration_number,
                registration_date
            });

			// Conv Date 
			const dateObj = new Date(registration_date);
			registration.registration_date = `${dateObj.getUTCFullYear()}-${UtilityService.convDoisDigitos((dateObj.getUTCMonth() + 1).toString())}-${UtilityService.convDoisDigitos(dateObj.getUTCDate().toString())}`;

			registration.student = new Student();
			registration.student.id = student_id;

			registration.school = new School();
			registration.school.id = school_id;

			registration.schoolClass = new SchoolClass();
			registration.schoolClass.id = school_class_id;

			const newRegistration = await this.repo.insert(registration);

			registration.id = newRegistration.identifiers[0].id;

			return res.json(registration);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update Registration
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	updateRegistration = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { registrationID } = req.params;
			const { registration_number, registration_date, student_id, school_id, school_class_id } = req.body;

			if (!registrationID) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const registration: Registration = this.repo.create({
                registration_number,
                registration_date
            });

			// Conv Date 
			const dateObj = new Date(registration_date);
			registration.registration_date = `${dateObj.getUTCFullYear()}-${UtilityService.convDoisDigitos((dateObj.getUTCMonth() + 1).toString())}-${UtilityService.convDoisDigitos(dateObj.getUTCDate().toString())}`;

			registration.student = new Student();
			registration.student.id = student_id;

			registration.school = new School();
			registration.school.id = school_id;

			registration.schoolClass = new SchoolClass();
			registration.schoolClass.id = school_class_id;

			const result = await this.repo.update(+registrationID, registration);

			if(result.affected === 0) {
				return res.status(404).json({error: 'Registration not found'});
			}

			registration.id = +registrationID;

			return res.json([registration]);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete Registration
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	deleteRegistration = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { registrationID } = req.params;

			if (!registrationID || !UtilityService.isJustNumber(registrationID)) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const result = await this.repo.delete(+registrationID);

			if(result.affected === 0) {
				return res.status(404).json({ error: 'Registration not found' });
			}

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}
}
