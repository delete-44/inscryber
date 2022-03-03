import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect from "components/multi-select";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

describe("MultiSelect", () => {
  const mockCallback = jest.fn();

  const testOptions = [
    { value: "test-1", label: "Test Option #1" },
    { value: "test-2", label: "Test Option #2" },
    { value: "test-3", label: "Test Option #3" },
    { value: "test-4", label: "Test Option #4" },
  ];

  beforeEach(() => {
    render(
      <MultiSelect
        id="TEST-ID"
        options={testOptions}
        maxOptions={10}
        setSelected={mockCallback}
        selected={["test-1"]}
      />
    );
    jest.clearAllMocks();
  });

  it("renders a combobox with help text", () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /MultiSelect/,
    });
    const maxText = screen.getByText("10 maximum")

    expect(multiSelectField).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("renders provided options", () => {});

  it("correctly shows selected values", () => {});

  it("calls setSelected when options change", () => {});
});
