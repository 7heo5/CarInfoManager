import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddCarForm from "./AddCarForm";

describe("AddCarForm", () => {
  it("posts a new customer vehicle record", async () => {
    const user = userEvent.setup();
    const onCarAdded = vi.fn();
    const createdCar = { id: 4, make: "Ford", model: "Transit" };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(createdCar),
    });

    render(<AddCarForm onCarAdded={onCarAdded} />);

    await user.type(screen.getByLabelText(/customer name/i), "Taylor Motors");
    await user.type(screen.getByLabelText(/phone/i), "07700 900123");
    await user.type(screen.getByLabelText(/email/i), "hello@example.com");
    await user.type(screen.getByLabelText(/customer notes/i), "Trade account");
    await user.type(screen.getByLabelText(/^make$/i), "Ford");
    await user.type(screen.getByLabelText(/^model$/i), "Transit");
    await user.type(screen.getByLabelText(/^year$/i), "2020");
    await user.type(screen.getByLabelText(/vin/i), "VIN12345678901234");
    await user.click(screen.getByRole("button", { name: /add vehicle record/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:5257/api/cars",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          make: "Ford",
          model: "Transit",
          year: 2020,
          vin: "VIN12345678901234",
          customer: {
            name: "Taylor Motors",
            phone: "07700 900123",
            email: "hello@example.com",
            notes: "Trade account",
          },
        }),
      })
    );
    expect(onCarAdded).toHaveBeenCalledWith(createdCar);
  });

  it("shows an error when the API rejects the vehicle", async () => {
    const user = userEvent.setup();
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false });

    render(<AddCarForm onCarAdded={vi.fn()} />);

    await user.type(screen.getByLabelText(/customer name/i), "Taylor Motors");
    await user.type(screen.getByLabelText(/^make$/i), "Ford");
    await user.type(screen.getByLabelText(/^model$/i), "Transit");
    await user.type(screen.getByLabelText(/^year$/i), "2020");
    await user.type(screen.getByLabelText(/vin/i), "VIN12345678901234");
    await user.click(screen.getByRole("button", { name: /add vehicle record/i }));

    expect(await screen.findByText(/failed to add car/i)).toBeInTheDocument();
  });
});
