import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders the selected variant", () => {
    render(<Badge variant="secondary">Pending</Badge>);

    expect(screen.getByText("Pending")).toHaveClass("bg-secondary");
  });
});
