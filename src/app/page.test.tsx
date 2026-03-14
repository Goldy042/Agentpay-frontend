import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders AgentPay heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /AgentPay/i })).toBeInTheDocument();
  });

  it("renders protocol description", () => {
    render(<Home />);
    expect(screen.getByText(/Machine-to-machine payment protocol on Stellar/i)).toBeInTheDocument();
  });
});
