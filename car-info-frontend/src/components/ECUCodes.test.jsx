import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ECUCodes from "./ECUCodes";
import { apiClient } from "@/api/client";

vi.mock("@/api/client", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ECUCodes", () => {
  beforeEach(() => {
    apiClient.get.mockResolvedValue({ data: [] });
  });

  it("loads and displays ECU codes for a vehicle", async () => {
    apiClient.get.mockResolvedValueOnce({
      data: [
        {
          id: 5,
          code: "P0301",
          description: "Cylinder 1 misfire",
          status: "Pending",
          loggedDate: "2026-06-01T00:00:00",
        },
      ],
    });

    render(<ECUCodes carId={12} />);

    expect(await screen.findByText("P0301")).toBeInTheDocument();
    expect(screen.getByText("Cylinder 1 misfire")).toBeInTheDocument();
    expect(apiClient.get).toHaveBeenCalledWith("/api/ECUCodes/12");
  });

  it("adds a new pending ECU code", async () => {
    const user = userEvent.setup();
    apiClient.post.mockResolvedValueOnce({
      data: {
        id: 6,
        carId: 12,
        code: "P0420",
        description: "Catalyst efficiency",
        status: "Pending",
        loggedDate: "2026-06-01T00:00:00",
      },
    });

    render(<ECUCodes carId={12} />);

    await user.click(screen.getByRole("button", { name: /add code/i }));
    await user.type(screen.getByPlaceholderText(/code/i), "P0420");
    await user.type(screen.getByPlaceholderText(/description/i), "Catalyst efficiency");
    await user.click(screen.getByRole("button", { name: /save code/i }));

    expect(apiClient.post).toHaveBeenCalledWith("/api/ECUCodes", {
      carId: 12,
      code: "P0420",
      description: "Catalyst efficiency",
      status: "Pending",
    });
    expect(await screen.findByText("P0420")).toBeInTheDocument();
  });

  it("toggles an ECU code status", async () => {
    const user = userEvent.setup();
    apiClient.get.mockResolvedValueOnce({
      data: [
        {
          id: 5,
          code: "P0301",
          description: "Cylinder 1 misfire",
          status: "Pending",
          loggedDate: "2026-06-01T00:00:00",
        },
      ],
    });
    apiClient.put.mockResolvedValueOnce({});

    render(<ECUCodes carId={12} />);

    await user.click(await screen.findByText("Pending"));

    expect(apiClient.put).toHaveBeenCalledWith("/api/ECUCodes/5", {
      code: "P0301",
      description: "Cylinder 1 misfire",
      status: "Resolved",
    });
    await waitFor(() => expect(screen.getByText("Resolved")).toBeInTheDocument());
  });
});
