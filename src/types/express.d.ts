import { User } from "../entities/user.entity";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
    };
  }
}
