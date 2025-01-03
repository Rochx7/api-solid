import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "@/use-cases/search-gyms";
import { beforeEach, describe, expect, it } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Mansão Maromba",
      description: null,
      phone: null,
      latitude: -24.9335066,
      longitude: 52.812215,
    });
    await gymsRepository.create({
      title: "Iron Berg",
      description: null,
      phone: null,
      latitude: 25.1407604,
      longitude: -52.8118596,
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: "Iron",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Iron Berg" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Mansão Maromba - ${i}`,
        description: null,
        phone: null,
        latitude: -24.9335066,
        longitude: 52.812215,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: "Mansão",
      page: 2,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Mansão Maromba - 21" }),
      expect.objectContaining({ title: "Mansão Maromba - 22" }),
    ]);
  });
});
