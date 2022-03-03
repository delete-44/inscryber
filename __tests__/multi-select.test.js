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
        selected={[
          { value: "test-1", label: "Test Option #1" },
          { value: "test-4", label: "Test Option #4" },
        ]}
      />
    );
    jest.clearAllMocks();
  });

  it("renders a combobox with help text", () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });
    const maxText = screen.getByText("10 maximum");

    expect(multiSelectField).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("renders provided options", () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    selectEvent.openMenu(multiSelectField);

    expect(screen.getByText(/Test Option #1/)).toBeInTheDocument();
    expect(screen.getByText(/Test Option #2/)).toBeInTheDocument();
    expect(screen.getByText(/Test Option #3/)).toBeInTheDocument();
    expect(screen.getByText(/Test Option #4/)).toBeInTheDocument();
  });

  it("correctly shows selected values", () => {
    const remove1Button = screen.getByRole("button", {
      name: "Remove Test Option #1",
    });

    const remove4Button = screen.getByRole("button", {
      name: "Remove Test Option #4",
    });

    expect(remove1Button).toBeInTheDocument();
    expect(remove4Button).toBeInTheDocument();

    expect(screen.getByText(/Test Option #1/)).toBeInTheDocument();
    expect(screen.queryByText(/Test Option #2/)).toBeNull();
    expect(screen.queryByText(/Test Option #3/)).toBeNull();
    expect(screen.getByText(/Test Option #4/)).toBeInTheDocument();
  });

  it("calls setSelected when options change", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    const remove4Button = screen.getByRole("button", {
      name: "Remove Test Option #4",
    });

    // Confirm adding options works
    await selectEvent.select(multiSelectField, /Test Option #2/);

    expect(mockCallback).toHaveBeenLastCalledWith([
      { label: "Test Option #1", value: "test-1" },
      { label: "Test Option #4", value: "test-4" },
      { label: "Test Option #2", value: "test-2" },
    ]);

    userEvent.click(remove4Button);

    // Confirm removing options works
    expect(mockCallback).toHaveBeenLastCalledWith([
      { label: "Test Option #1", value: "test-1" },
    ]);
  });
});
