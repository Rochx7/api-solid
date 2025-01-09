import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "tests/utils/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Giga Gym",
        description: "Some description",
        phone: "40028922",
        latitude: -22.881302,
        longitude: -43.2910435,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Mini Gym",
        description: "Some description",
        phone: "40028922",
        latitude: 25.1407604,
        longitude: -43.2864638,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -22.881302, longitude: -43.2910435 })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Giga Gym",
      }),
    ]);
  });
});
