import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormFieldLayout from "layouts/form-field-layout";

describe("FormFieldLayout", () => {
  it("renders children by default", () => {
    render(
      <FormFieldLayout>
        <button>Test Button</button>
      </FormFieldLayout>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("hides children from screenreaders when readonly prop supplied", () => {
    render(
      <FormFieldLayout readonly>
        <button>Test Button</button>
      </FormFieldLayout>
    );

    let button = screen.queryByRole("button");
    expect(button).toBeNull();

    button = screen.getByRole("button", { hidden: true });
    expect(button).toBeInTheDocument();
  });
});
