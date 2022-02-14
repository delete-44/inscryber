import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Portrait from "@form_fields/portrait";
import { HEAVYWEIGHT } from "components/constants";

describe("Portrait", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Portrait setPortraitTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a field upload field", () => {
    const fileField = screen.getByLabelText("portrait");

    expect(fileField).toBeInTheDocument();
    expect(fileField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const fileFlavour = screen.getByText("Finally... a .");
    const fileLabel = screen.getByText("portrait");

    expect(fileFlavour).toBeInTheDocument();
    expect(fileLabel).toBeInTheDocument();
  });
});
