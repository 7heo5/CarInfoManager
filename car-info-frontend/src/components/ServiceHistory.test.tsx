import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ServiceHistory from "./ServiceHistory";

vi.mock("./ECUCodes", () => ({
  default: () => <div>ECU codes panel</div>,
}));

describe("ServiceHistory", () => {
  it("loads service records for a vehicle", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([
        {
          id: 4,
          carId: 2,
          date: "2026-06-10T00:00:00",
          serviceType: "MOT",
          notes: "Passed",
          cost: 54.85,
        },
      ]),
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    render(<ServiceHistory carId={2} />);

    expect(await screen.findByText("MOT")).toBeInTheDocument();
    expect(screen.getByText("Passed")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5257/api/servicerecords/car/2"
    );
  });

  it("posts a new service record and refreshes the list", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    render(<ServiceHistory carId={2} />);

    await user.type(screen.getByLabelText(/service date/i), "2026-06-14");
    await user.type(screen.getByLabelText(/service type/i), "Oil Change");
    await user.type(screen.getByLabelText(/notes/i), "Changed oil and filter");
    await user.type(screen.getByLabelText(/cost/i), "120");
    await user.click(screen.getByRole("button", { name: /add service record/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    const [, request] = fetchMock.mock.calls[1];
    const body = JSON.parse(request.body);

    expect(fetchMock.mock.calls[1][0]).toBe("http://localhost:5257/api/servicerecords");
    expect(request.method).toBe("POST");
    expect(body).toMatchObject({
      carId: 2,
      serviceType: "Oil Change",
      notes: "Changed oil and filter",
      cost: 120,
    });
  });
});
