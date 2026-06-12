import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../Breadcrumb";

describe("Breadcrumb", () => {
  it("renders all items with the last marked aria-current", () => {
    render(
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: "Detail" },
        ]}
      />
    );
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Detail")).toHaveAttribute("aria-current", "page");
  });
});
