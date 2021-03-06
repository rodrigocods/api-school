import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { Teacher } from "./model";

class TeacherService {
    private readonly repo: Repository<Teacher> = AppDataSource.getRepository(Teacher);

    teacherLogin = async (email: string, password: string) => {
        try {
            const teacher = await this.repo.find({
                where: {
                    email: email,
                    password: password
                }
            });

            return teacher;
        } catch (error) {
            return [];
        }
    }
}

export default new TeacherService();