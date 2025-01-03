import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymUseCase } from "@/use-cases/fetch-nearby-gym";

import { beforeEach, describe, expect, it } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let fetchNearbyGymUseCase: FetchNearbyGymUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    fetchNearbyGymUseCase = new FetchNearbyGymUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -22.881302,
      longitude: -43.2910435,
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: 25.1407604,
      longitude: -43.2864638,
    });

    const { gyms } = await fetchNearbyGymUseCase.execute({
      userLatitude: -22.887388,
      userLongitude: -43.281269,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
