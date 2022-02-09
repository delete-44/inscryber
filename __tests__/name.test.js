import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Name from "../components/name";
import { HEAVYWEIGHT } from "../components/constants";

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

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        `l_text:${HEAVYWEIGHT}_128:123456789,g_north,y_48,w_600,h_116,c_fit/`
      );
    });
  });

  it("uses scale cropping for long strings", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "1234567890");

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        `l_text:${HEAVYWEIGHT}_128:1234567890,g_north,y_48,w_600,h_116,c_scale/`
      );
    });
  });

  it("encodes special characters in transformation", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "Test String");

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        `l_text:${HEAVYWEIGHT}_128:Test%20String,g_north,y_48,w_600,h_116,c_scale/`
      );
    });
  });

  it("staggers requests to only fire after user stops typing", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "Test String LONG LONG LONG LONG LONG LONG");

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  it("completely removes the transformation when field is empty", async () => {});
});
