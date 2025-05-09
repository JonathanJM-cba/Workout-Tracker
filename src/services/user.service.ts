import { userModel } from "../entities";
import { User } from "../entities/user.entity";
import { checkPassword, encryptPassword } from "../utils/handlePassword";

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  //Se procede a crear el usuario pero antes se encripta la contraseña
  const passwordHash = await encryptPassword(password);

  const newUser = await userModel.create({
    name,
    email,
    password: passwordHash,
  });
  return await userModel.save(newUser);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await userModel.findOne({
    where: { email: email },
  });
};

export const verifyPassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return await checkPassword(password, passwordHash);
};
