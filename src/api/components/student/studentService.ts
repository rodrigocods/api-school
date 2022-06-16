import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { Student } from "./student";

class StudentService {
  private readonly repo: Repository<Student> = AppDataSource.getRepository(Student);

  async studentLogin(email: string, password: string) {
    try {
      const student = await this.repo.find({
        where: {
          email: email,
          password: password
        }
      });

      return student;
    } catch (error) {
      return [];
    }
  }
}

export default new StudentService();