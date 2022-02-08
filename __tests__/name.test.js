import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Name from "../components/name";

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

  it("generates a specific transformation when text changes", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    userEvent.type(nameField, "Test");

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        "l_text:v1644177732:Inscryption:HEAVYWEIGHT.ttf_84:Test,g_north,y_64/c_scale,"
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
        "l_text:v1644177732:Inscryption:HEAVYWEIGHT.ttf_84:Test%20String,g_north,y_64/c_scale,"
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
});
