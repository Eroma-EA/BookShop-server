import { IAuth } from "../intefaces/IAuth";
import { UserService } from "./user.service";
import { IUser } from "../intefaces/IUser";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { MailService } from "./mail.service";
require("dotenv").config();

export class AuthService {
  async login(user: IAuth) {
    try {
      const getUser: IUser | null = await new UserService().getOne(user);
      if (!getUser) {
        throw new Error("Name of user is not correct");
      }

      const isMatch = bcrypt.compareSync(user.password, getUser.password);
      if (!isMatch) {
        throw new Error("Password is not correct");
      }

      const token = jwt.sign({ sub: getUser.id }, `${process.env.JWT_ACCESS_SECRET}`, {
        expiresIn: "1h",
      });

      return { user: getUser, token };
    } catch (error) {
      throw error;
    }
  }

  async tokenIsValid(token: string) {
    try {
      // console.log(token);
      const { sub } = jwt.verify(token.split(" ")[1], `${process.env.JWT_ACCESS_SECRET}`);

      const user: IUser | null = await new UserService().getById(sub ? +sub : 0);
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      return false;
    }
  }

  async registration(user: IUser) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const newUser: IUser = await new UserService().post(user);

      const token = jwt.sign({ sub: newUser.id }, `${process.env.JWT_ACCESS_SECRET}`, {
        expiresIn: "1h",
      });

      // new MailService().sendMail({
      //   from: "eroma.test.ea@gmail.com",
      //   to: newUser.email,
      //   subject: "Registration",
      //   html: `
      //   <h3> you are registered </h3>
      //    <p>newUser.email<p>
      //   http://localhost:3000/registration/confirm/${token}
      //   `,
      // });

      return {
        user: {
          ...newUser,
          password: undefined,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(token: string) {
    try {
      const { sub } = jwt.verify(token.split(" ")[1], `${process.env.JWT_ACCESS_SECRET}`);
      const user: IUser | null = await new UserService().getById(sub ? +sub : 0);
      if (!user) {
        return false;
      }
      return { id: 0, email: "", password: "", banned: "", banReason: "" };
    } catch (error) {
      return false;
    }
  }
}
