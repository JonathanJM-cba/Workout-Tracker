import request from "supertest";
import app from "../../src/app";
import * as workoutService from "../../src/services/workout.service";

jest.mock("../../src/middleware/checkAuth", () => ({
  checkAuth: (req: any, _res: any, next: any) => {
    req.user = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };
    next();
  },
}));

jest.mock("../../src/services/workout.service");

const mockedSaveWorkout = workoutService.saveExercise as jest.Mock;

//TEST: Registrar entrenamiento con sus ejercicios
describe("POST /workouts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Registrar un entrenamiento con sus ejercicios exitosamente", async () => {
    const mockWorkout = {
      id: 3,
      scheduledDate: new Date().toISOString(),
      state: "pendiente",
      note: "Trabajo de brazos y espalda",
      createdAt: "2025-06-10T00:31:27.797Z",
      updatedAt: "2025-06-10T00:31:27.797Z",
      workoutsExercises: [
        {
          id: 8,
          sets: 3,
          reps: 20,
          weightKg: "20.00",
          exercise: {
            id: 3,
            name: "Press de banca",
            description:
              "Fortalece el pecho, los hombros y los tríceps. Se realiza con una barra y una pesa. ",
            category: "fuerza",
            muscleGroup: "pecho",
            createdAt: "2025-05-10T01:09:48.051Z",
            updatedAt: "2025-05-10T01:09:48.051Z",
          },
        },
      ],
    };
    mockedSaveWorkout.mockResolvedValue(mockWorkout);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const res = await request(app)
      .post("/api/workouts")
      .set("Authorization", "Bearer fakeToken")
      .send({
        scheduledDate: tomorrow.toISOString(),
        note: "Trabajo de brazos y espalda",
        exercises: [
          {
            exerciseId: 3,
            sets: 3,
            reps: 20,
            weightKg: 20,
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Entrenamiento creado con éxito"
    );
    expect(res.body.data).toEqual(mockWorkout);
  });

  it("Devolver 400 al registrar workout con una fecha menor a la actual", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    mockedSaveWorkout.mockResolvedValue({
      scheduledDate: yesterday.toISOString(),
    });

    const res = await request(app)
      .post("/api/workouts")
      .set("Authorization", "Bearer fakeToken")
      .send({
        scheduledDate: yesterday.toISOString(),
        note: "Trabajo de brazos y espalda",
        exercises: [
          {
            exerciseId: 3,
            sets: 3,
            reps: 20,
            weightKg: 20,
          },
        ],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "ERROR_TRAINING_DATE_MUST_BE_FUTURE"
    );
  });
});
