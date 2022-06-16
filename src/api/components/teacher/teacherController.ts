import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { StringUtility } from '../../../utility/stringUtility';
import { Teacher } from './teacher';
import { createHmac } from 'crypto';
import { School } from '../school/school';
export class TeacherController {
  private readonly repo: Repository<Teacher> = AppDataSource.getRepository(Teacher);

  /**
   * Read Teachers
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  async readTeachers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const Teachers: Array<Teacher> = await this.repo.find();

      return res.json(Teachers);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Read Teacher
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  async readTeacher(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { teacherID } = req.params;

      const Teacher = await this.repo.find({
        where: {
          id: +teacherID
        }
      });

      return res.json(Teacher);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Create Teacher
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  async createTeacher(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password, school_id } = req.body;

      const teacher: Teacher = this.repo.create({
        name,
        email,
        password
      });

      teacher.school = new School();
      teacher.school.id = school_id;

      const hash = createHmac("sha256", process.env.SECRET).update(teacher.password).digest("hex");

      teacher.password = hash;

      const newTeacher = await this.repo.insert(teacher);

      teacher.id = newTeacher.identifiers[0].id;

      return res.json(teacher);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Update Teacher
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  async updateTeacher(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { teacherID } = req.params;
      const { name, email, password, school_id } = req.body;

      if(!teacherID) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const teacher: Teacher = this.repo.create({
        name,
        email,
        password
      });

      teacher.school = new School();
      teacher.school.id = school_id;

      const hash = createHmac("sha256", process.env.SECRET).update(teacher.password).digest("hex");

      teacher.password = hash;

      const result = await this.repo.update(+teacherID, teacher);

      if(result.affected === 0) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      teacher.id = +teacherID;

      return res.json([teacher]);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Delete Teacher
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns HTTP response
   */
  async deleteTeacher(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { teacherID } = req.params;

      if(!teacherID || !StringUtility.isJustNumber(teacherID)) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const result = await this.repo.delete(+teacherID);

      if(result.affected === 0) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}
