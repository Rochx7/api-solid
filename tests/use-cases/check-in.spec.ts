import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "@/use-cases/check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    checkInUseCase = new CheckInUseCase(checkInsRepository);
  });
  it("should be able to check in", async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
