import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { UtilityService } from '../../../services/utility';
import { Student } from './model';
import { createHash, createHmac } from 'crypto';
import { env } from '../../../config/globals';
import { School } from '../school/model';
export class StudentController {
	private readonly repo: Repository<Student> = AppDataSource.getRepository(Student);

	/**
	 * Read Students
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	readStudents = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const Students: Array<Student> = await this.repo.find();

			return res.json(Students);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read Student
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	readStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { studentID } = req.params;

			const Student = await this.repo.find({
				where: {
					id: +studentID
				}
			});

			return res.json(Student);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create Student
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	createStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { name, email, password, school_id } = req.body;

			const student: Student = this.repo.create({
                name,
                email,
                password
            });

			student.school = new School();
			student.school.id = school_id;

            const hash = createHmac("sha256", process.env.SECRET).update(student.password).digest("hex");

            student.password = hash;

			const newStudent = await this.repo.insert(student);

			student.id = newStudent.identifiers[0].id;

			return res.json(student);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Update Student
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { studentID } = req.params;
			const { name, email, password, school_id } = req.body;

			if (!studentID) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const student: Student = this.repo.create({
                name,
                email,
                password
            });

			student.school = new School();
			student.school.id = school_id;

			const hash = createHmac("sha256", process.env.SECRET).update(student.password).digest("hex");

            student.password = hash;

			const result = await this.repo.update(+studentID, student);

			if(result.affected === 0) {
				return res.status(404).json({error: 'Student not found'});
			}

			student.id = +studentID;

			return res.json([student]);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete Student
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { studentID } = req.params;

			if (!studentID || !UtilityService.isJustNumber(studentID)) {
				return res.status(400).json({ error: 'Invalid request' });
			}

			const result = await this.repo.delete(+studentID);

			if(result.affected === 0) {
				return res.status(404).json({ error: 'Student not found' });
			}

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}
}
