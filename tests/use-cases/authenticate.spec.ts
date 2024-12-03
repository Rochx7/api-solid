import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/errors/invalid-credentials.error";

describe("Authenticate Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should be not able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    expect(async () => {
      await authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should be not able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123123", 6),
    });

    expect(async () => {
      await authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
