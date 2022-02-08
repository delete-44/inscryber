import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Name from "../components/name";

describe("Name", () => {
  beforeEach(() => {
    render(<Name setNameTF={() => {}} />);
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
});
