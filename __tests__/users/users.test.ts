import request from "supertest";
import app from "../../src/app";
import * as userService from "../../src/services/user.service";
import { generateAccessToken } from "../../src/utils/handleToken";

jest.mock("../../src/services/user.service");
jest.mock("../../src/utils/handleToken");

const mockedFindUserByEmail = userService.findUserByEmail as jest.Mock;
const mockedCreateUser = userService.createUser as jest.Mock;
const mockedVerifyPassword = userService.verifyPassword as jest.Mock;
const mockedGenerateAccessToken = generateAccessToken as jest.Mock;

//TEST: Registro de Usuario
describe("POST /auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Registrar usuario exitosamente", async () => {
    mockedFindUserByEmail.mockResolvedValue(null); //Caso en el que no existe un usuario con el email
    mockedCreateUser.mockResolvedValue({
      name: "Test User",
      email: "test@example.com",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Usuario creado con éxito");
    expect(res.body.data).toEqual({
      name: "Test User",
      email: "test@example.com",
    });
  });

  it("Devolver un error si el usuario ya existe", async () => {
    mockedFindUserByEmail.mockResolvedValue({
      email: "test@example.com",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "ERROR_USER_EXISTS");
  });
});

//TEST: Logueo de Usuario
describe("POST /auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Loguear usuario exitosamente", async () => {
    mockedFindUserByEmail.mockResolvedValue({
      name: "Test User",
      email: "test@example.com",
      password: "hashPassword",
    });
    mockedVerifyPassword.mockResolvedValue(true);
    mockedGenerateAccessToken.mockResolvedValue("access_token");

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Sesión iniciada con éxito");
    expect(res.body.data).toEqual({
      name: "Test User",
      email: "test@example.com",
      access_token: "access_token",
    });
  });

  it("Intentar loguear un usuario que no existe", async () => {
    mockedFindUserByEmail.mockResolvedValue(null);

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "ERROR_USER_NOT_FOUND");
  });

  it("Intentar loguear un usuario con la contraseña incorrecta", async () => {
    mockedFindUserByEmail.mockResolvedValue({
      name: "Test User",
      email: "test@example.com",
      password: "hashPassword",
    });
    mockedVerifyPassword.mockResolvedValue(false);

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "ERROR_PASSWORD_INVALID");
  });

  it("Intentar loguear un usuario sin generar access token", async () => {
    mockedFindUserByEmail.mockResolvedValue({
      name: "Test User",
      email: "test@example.com",
      password: "hashPassword",
    });
    mockedVerifyPassword.mockResolvedValue(true);
    mockedGenerateAccessToken.mockResolvedValue(null);

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "ERROR_GENERATE_TOKEN");
  });
});
