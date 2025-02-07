import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { ResourceNotFoundError } from "@/errors/resource-not-found.error";

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    });
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should be not able to get user profile with wrong id", async () => {
    expect(async () => {
      await getUserProfileUseCase.execute({
        userId: "not-existing-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
