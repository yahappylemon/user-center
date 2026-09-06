import { beforeEach, describe, expect, it } from "vitest";
import { demoAPI } from "./demoStore";

const storage = new Map();

globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
};

describe("demo API", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores registered users and allows them to log in", async () => {
    await demoAPI.register({
      userName: "grace",
      userPassword: "Grace123",
      checkPassword: "Grace123",
    });

    const result = await demoAPI.login({
      userName: "grace",
      userPassword: "Grace123",
    });

    expect(result.data.data).toBe("demo-token");
    await expect(demoAPI.userInfo()).resolves.toMatchObject({
      data: { data: { username: "grace" } },
    });
  });

  it("calculates first lesson statistics for every year in demo data", async () => {
    await demoAPI.createCustomer({
      customerName: "Future Customer",
      gender: "F",
      firstLesson: "2026-09-06",
      approaches: ["Social media"],
      regularExercises: ["Yoga"],
    });

    const result = await demoAPI.statistics("firstLesson");

    expect(result.data.data[2026]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]);
  });
});
