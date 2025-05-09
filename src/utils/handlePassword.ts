import bcrypt from "bcryptjs";
const saltRounds: number = 10;

/**
 * Función para encriptar password
 * @param {string} passwordPlain - Pasar la contraseña en texto plano
 * @returns {string} - Retorna la contraseña encriptada
 */
export const encryptPassword = async (passwordPlain: string) => {
  return await bcrypt.hash(passwordPlain, saltRounds);
};

/**
 * Función para verificar la contraseña encriptada del usuario
 * @param {string} passwordPlain - Pasar la contraseña del usuario
 * @param {string} passwordHash - Pasar la contraseña encriptada del usuario
 * @returns
 */
export const checkPassword = async (
  passwordPlain: string,
  passwordHash: string
) => {
  return await bcrypt.compare(passwordPlain, passwordHash);
};
