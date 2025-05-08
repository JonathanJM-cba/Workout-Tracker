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
