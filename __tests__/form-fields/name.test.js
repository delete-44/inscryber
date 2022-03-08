import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Name from "@form-fields/name";
import { VICIOUS_HUNGER } from "components/constants";

describe("Name", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Name setNameTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a name text box", () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    expect(nameField).toBeInTheDocument();
    expect(nameField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const nameFlavour = screen.getByText("Tell me this creature's .");
    const nameLabel = screen.getByText("name");

    expect(nameFlavour).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
  });

  it("uses fit cropping for short strings", () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "123456789");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${VICIOUS_HUNGER}_128:123456789/t_name_short/`
    );
  });

  it("uses scale cropping for long strings", () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "123456789012");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${VICIOUS_HUNGER}_128:123456789012/t_name_long/`
    );
  });

  it("encodes special characters in transformation", () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "Test String");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${VICIOUS_HUNGER}_128:Test%20String/t_name_short/`
    );
  });

  it("completely removes the transformation when field is empty", () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "123456789");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${VICIOUS_HUNGER}_128:123456789/t_name_short/`
    );

    userEvent.type(nameField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
