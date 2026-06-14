import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ServiceRecordItem from "./ServiceRecordItem";

describe("ServiceRecordItem", () => {
  const record = {
    id: 2,
    carId: 9,
    date: "2026-06-01T00:00:00",
    serviceType: "Inspection",
    notes: "Initial notes",
    cost: 80,
  };

  it("updates a service record without expecting response JSON", async () => {
    const user = userEvent.setup();
    const setServiceRecords = vi.fn();
    const setEditingRecordId = vi.fn();
    const setEditForm = vi.fn();
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(
      <ServiceRecordItem
        record={record}
        editingRecordId={record.id}
        setEditingRecordId={setEditingRecordId}
        editForm={{
          id: record.id,
          carId: record.carId,
          date: "2026-06-01",
          serviceType: "Inspection",
          notes: "Initial notes",
          cost: 80,
        }}
        setEditForm={setEditForm}
        setServiceRecords={setServiceRecords}
      />
    );

    const serviceTypeInput = screen.getByDisplayValue("Inspection");
    await user.clear(serviceTypeInput);
    await user.type(serviceTypeInput, "Brake Service");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(globalThis.fetch.mock.calls[0][0]).toBe("http://localhost:5257/api/servicerecords/2");
    expect(globalThis.fetch.mock.calls[0][1]).toEqual(
      expect.objectContaining({ method: "PUT" })
    );
    expect(setServiceRecords).toHaveBeenCalledWith(expect.any(Function));
    expect(setEditingRecordId).toHaveBeenCalledWith(null);
  });

  it("deletes a service record after confirmation", async () => {
    const user = userEvent.setup();
    const setServiceRecords = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(
      <ServiceRecordItem
        record={record}
        editingRecordId={null}
        setEditingRecordId={vi.fn()}
        editForm={{}}
        setEditForm={vi.fn()}
        setServiceRecords={setServiceRecords}
      />
    );

    await user.click(screen.getAllByRole("button")[1]);

    expect(window.confirm).toHaveBeenCalled();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:5257/api/servicerecords/2",
      { method: "DELETE" }
    );
    expect(setServiceRecords).toHaveBeenCalledWith(expect.any(Function));
  });
});
