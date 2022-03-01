import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Name from "@form-fields/name";
import { HEAVYWEIGHT } from "components/constants";

const SHORT_STRING_TRANSFORMATION =
  "w_560,h_115,c_fit/fl_layer_apply,y_48,g_north/";
const LONG_STRING_TRANSFORMATION =
  "w_580,h_75,c_scale/fl_layer_apply,y_64,g_north/";

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

  it("uses fit cropping for short strings", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "123456789");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${HEAVYWEIGHT}_128:123456789,${SHORT_STRING_TRANSFORMATION}`
    );
  });

  it("uses scale cropping for long strings", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "123456789012");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${HEAVYWEIGHT}_128:123456789012,${LONG_STRING_TRANSFORMATION}`
    );
  });

  it("encodes special characters in transformation", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "Test String");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${HEAVYWEIGHT}_128:Test%20String,${SHORT_STRING_TRANSFORMATION}`
    );
  });

  it("completely removes the transformation when field is empty", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "123456789");

    expect(mockCallback).toHaveBeenLastCalledWith(
      `l_text:${HEAVYWEIGHT}_128:123456789,${SHORT_STRING_TRANSFORMATION}`
    );

    userEvent.type(nameField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
