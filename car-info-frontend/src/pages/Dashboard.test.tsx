import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Dashboard from "./Dashboard";
import { renderWithRouter } from "@/test/renderWithRouter";

describe("Dashboard", () => {
  it("renders customer vehicle cards from the API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([
        {
          id: 1,
          make: "Ford",
          model: "Transit",
          year: 2020,
          vin: "VIN12345678901234",
          customer: { name: "Taylor Motors", phone: "07700 900123" },
        },
      ]), 
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    renderWithRouter(<Dashboard />);

    expect(await screen.findByText("Ford Transit")).toBeInTheDocument();
    expect(screen.getByText("Taylor Motors")).toBeInTheDocument();
    expect(screen.getByText("07700 900123")).toBeInTheDocument();
  });

  it("removes a vehicle card after a successful delete", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue([
          {
            id: 1,
            make: "Ford",
            model: "Transit",
            year: 2020,
            vin: "VIN12345678901234",
            customer: { name: "Taylor Motors", phone: "" },
          },
        ]),
      })
      .mockResolvedValueOnce({ ok: true });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    renderWithRouter(<Dashboard />);

    expect(await screen.findByText("Ford Transit")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => expect(screen.queryByText("Ford Transit")).not.toBeInTheDocument());
    expect(fetchMock.mock.calls[1][0]).toBe("http://localhost:5257/api/cars/1");
    expect(fetchMock.mock.calls[1][1]).toEqual({ method: "DELETE" });
  });
});
