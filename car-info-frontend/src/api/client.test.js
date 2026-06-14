import { describe, expect, it } from "vitest";
import { API_BASE_URL, apiClient, apiUrl } from "./client";

describe("api client", () => {
  it("builds API URLs from the configured base URL", () => {
    expect(API_BASE_URL).toBe("http://localhost:5257");
    expect(apiUrl("/api/cars")).toBe("http://localhost:5257/api/cars");
  });

  it("configures axios with the same base URL", () => {
    expect(apiClient.defaults.baseURL).toBe(API_BASE_URL);
  });
});
