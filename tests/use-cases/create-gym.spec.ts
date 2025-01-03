import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "@/use-cases/create-gym";

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "Giga Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
