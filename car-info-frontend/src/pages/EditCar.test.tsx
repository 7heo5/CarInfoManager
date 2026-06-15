import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import EditCar from "./EditCar";
import { renderWithRouter } from "@/test/renderWithRouter";

describe("EditCar", () => {
  it("updates an existing vehicle with an existing customer", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          id: 7,
          customerId: 3,
          make: "BMW",
          model: "M2",
          year: 2019,
          vin: "BMWVIN1234567890",
          customer: {
            id: 3,
            name: "Old Customer",
            phone: "1",
            email: "old@example.com",
            notes: "",
          },
        }),
      })
      .mockResolvedValueOnce({ ok: true });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    renderWithRouter(<EditCar />, { route: "/edit/7", path: "/edit/:id" });

    await screen.findByDisplayValue("BMW");
    await user.clear(screen.getByLabelText(/customer name/i));
    await user.type(screen.getByLabelText(/customer name/i), "New Customer");
    await user.clear(screen.getByLabelText(/^model$/i));
    await user.type(screen.getByLabelText(/^model$/i), "M2 Competition");
    await user.click(screen.getByRole("button", { name: /update vehicle record/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const [, request] = fetchMock.mock.calls[1];
    const body = JSON.parse(request.body);

    expect(fetchMock.mock.calls[1][0]).toBe("http://localhost:5257/api/cars/7");
    expect(request.method).toBe("PUT");
    expect(body.customerId).toBe(3);
    expect(body.customer).toMatchObject({ id: 3, name: "New Customer" });
    expect(body.model).toBe("M2 Competition");
  });

  it("does not send a null customer id for legacy vehicles without customers", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          id: 8,
          customerId: null,
          make: "Mini",
          model: "Cooper",
          year: 2009,
          vin: "MINIVIN123456789",
          customer: null,
        }),
      })
      .mockResolvedValueOnce({ ok: true });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    renderWithRouter(<EditCar />, { route: "/edit/8", path: "/edit/:id" });

    await screen.findByDisplayValue("Mini");
    await user.type(screen.getByLabelText(/customer name/i), "Sam Green");
    await user.click(screen.getByRole("button", { name: /update vehicle record/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const body = JSON.parse(fetchMock.mock.calls[1][1].body);

    expect(body.customerId).toBeNull();
    expect(body.customer).toEqual({
      name: "Sam Green",
      phone: "",
      email: "",
      notes: "",
    });
    expect(body.customer).not.toHaveProperty("id");
  });
});
