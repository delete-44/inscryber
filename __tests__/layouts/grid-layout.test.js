import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GridLayout from "layouts/grid-layout";

describe("GridLayout", () => {
  beforeEach(() => {
    render(
      <GridLayout title="TEST TITLE" heading="TEST HEADER">
        TEST CHILD
      </GridLayout>
    );
  });

  it("renders a header and footer", () => {
    const header = screen.getByRole("heading", { name: "TEST HEADER" });

    expect(header).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    const footerNav = screen.getByRole("navigation");

    expect(footer).toBeInTheDocument();
    expect(footerNav).toBeInTheDocument();
  });

  it("renders children of the layout", () => {
    const childText = screen.getByText("TEST CHILD");

    expect(childText).toBeInTheDocument();
  });
});
