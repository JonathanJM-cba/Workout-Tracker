import request from "supertest";
import app from "../../src/app";
import * as exerciseService from "../../src/services/exercise.service";

jest.mock("../../src/services/exercise.service");

const mockedCreateNewExercise = exerciseService.createNewExercise as jest.Mock;

//TEST: Crear ejercicio
describe("POST /exercises", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Registrar un nuevo ejercicio exitosamente", async () => {
    const mockExercise = {
      name: "Sentadillas",
      description: "Trabajo de piernas y espalda",
      category: "fuerza",
      muscleGroup: "piernas",
    };

    mockedCreateNewExercise.mockResolvedValue(mockExercise);

    const res = await request(app).post("/api/exercises").send({
      name: "Sentadillas",
      description: "Trabajo de piernas y espalda",
      category: "fuerza",
      muscleGroup: "piernas",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Nuevo ejercicio creado con éxito"
    );
    expect(res.body.data).toEqual(mockExercise);
  });
});
