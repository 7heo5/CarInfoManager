import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Sidebar from "./Sidebar";
import { renderWithRouter } from "@/test/renderWithRouter";

describe("Sidebar", () => {
  it("shows workshop navigation links", () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText("Workshop Records")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /records/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /add vehicle/i })).toHaveAttribute("href", "/add");
  });
});
