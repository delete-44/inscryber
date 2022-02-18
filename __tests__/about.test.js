import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "pages/about";

describe("About", () => {
  beforeEach(async () => {
    render(<About />);
  });

  it("renders headers & footer", () => {
    const h1 = screen.getByRole("heading", { name: "About Inscryber" });
    const overview = screen.getByRole("heading", { name: "Overview" });
    const getInvolved = screen.getByRole("heading", { name: "Get Involved" });
    const ownership = screen.getByRole("heading", { name: "Ownership" });

    expect(h1).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(getInvolved).toBeInTheDocument();
    expect(ownership).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    const footerNav = screen.getByRole("navigation");

    expect(footer).toBeInTheDocument();
    expect(footerNav).toBeInTheDocument();
  });
});
