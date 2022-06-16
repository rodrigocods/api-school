import { NextFunction, Request, Response } from "express";
import TeacherService from "../teacher/teacherService";
import StudentService from "../student/studentService";
import { sign } from "jsonwebtoken";
import { createHmac } from "crypto";

interface loginReq {
  userType: "teacher" | "student",
  email: string,
  password: string
}

export class AuthController {
  login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userType, email, password }: loginReq = req.body;
      const hash = createHmac("sha256", process.env.SECRET).update(password).digest("hex");

      switch (userType) {
        case "teacher":
          const teacher = await TeacherService.teacherLogin(email, hash);

          if (teacher.length > 0) {
            const token = sign({ userType, id: teacher[0].id }, process.env.SECRET, {
              expiresIn: 300
            });

            return res.json({ auth: true, token: token });
          }

          return res.status(500).json({ message: 'Email or Password incorrect!' });
        case "student":
          const student = await StudentService.studentLogin(email, hash);

          if (student.length > 0) {
            const token = sign({ userType, id: student[0].id }, process.env.SECRET, {
              expiresIn: 300
            });

            return res.json({ auth: true, token: token });
          }

          return res.status(500).json({ message: 'Email or Password incorrect!' });
      }
    } catch (err) {
      return next(err);
    }
  }
}