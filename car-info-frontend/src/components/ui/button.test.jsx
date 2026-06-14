import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button";

describe("buttonVariants", () => {
  it("includes variant and size classes", () => {
    const classes = buttonVariants({ variant: "destructive", size: "sm" });

    expect(classes).toContain("bg-destructive");
    expect(classes).toContain("h-9");
  });
});
