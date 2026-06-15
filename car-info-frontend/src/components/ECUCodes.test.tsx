import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ECUCodes from "./ECUCodes";
import { apiGet, apiPost, apiPut } from "@/api/client";

vi.mock("@/api/client", () => ({
  apiDelete: vi.fn(),
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
}));

describe("ECUCodes", () => {
  beforeEach(() => {
    vi.mocked(apiGet).mockResolvedValue([]);
  });

  it("loads and displays ECU codes for a vehicle", async () => {
    vi.mocked(apiGet).mockResolvedValueOnce([
      {
        id: 5,
        carId: 12,
        code: "P0301",
        description: "Cylinder 1 misfire",
        status: "Pending",
        loggedDate: "2026-06-01T00:00:00",
      },
    ]);

    render(<ECUCodes carId={12} />);

    expect(await screen.findByText("P0301")).toBeInTheDocument();
    expect(screen.getByText("Cylinder 1 misfire")).toBeInTheDocument();
    expect(apiGet).toHaveBeenCalledWith("/api/ECUCodes/12");
  });

  it("adds a new pending ECU code", async () => {
    const user = userEvent.setup();
    vi.mocked(apiPost).mockResolvedValueOnce({
      id: 6,
      carId: 12,
      code: "P0420",
      description: "Catalyst efficiency",
      status: "Pending",
      loggedDate: "2026-06-01T00:00:00",
    });

    render(<ECUCodes carId={12} />);

    await user.click(screen.getByRole("button", { name: /add code/i }));
    await user.type(screen.getByPlaceholderText(/code/i), "P0420");
    await user.type(screen.getByPlaceholderText(/description/i), "Catalyst efficiency");
    await user.click(screen.getByRole("button", { name: /save code/i }));

    expect(apiPost).toHaveBeenCalledWith("/api/ECUCodes", {
      carId: 12,
      code: "P0420",
      description: "Catalyst efficiency",
      status: "Pending",
    });
    expect(await screen.findByText("P0420")).toBeInTheDocument();
  });

  it("toggles an ECU code status", async () => {
    const user = userEvent.setup();
    vi.mocked(apiGet).mockResolvedValueOnce([
      {
        id: 5,
        carId: 12,
        code: "P0301",
        description: "Cylinder 1 misfire",
        status: "Pending",
        loggedDate: "2026-06-01T00:00:00",
      },
    ]);
    vi.mocked(apiPut).mockResolvedValueOnce(undefined);

    render(<ECUCodes carId={12} />);

    await user.click(await screen.findByText("Pending"));

    expect(apiPut).toHaveBeenCalledWith("/api/ECUCodes/5", {
      code: "P0301",
      description: "Cylinder 1 misfire",
      status: "Resolved",
    });
    await waitFor(() => expect(screen.getByText("Resolved")).toBeInTheDocument());
  });
});
