import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddServiceRecordForm from "./AddServiceRecordForm";

describe("AddServiceRecordForm", () => {
  it("submits the current service record fields", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue();

    render(
      <AddServiceRecordForm
        newRecord={{
          date: "2026-06-14",
          serviceType: "Oil Change",
          notes: "Changed filter",
          cost: "120",
        }}
        onChange={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole("button", { name: /add service record/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});
