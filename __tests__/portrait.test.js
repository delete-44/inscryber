import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Portrait from "../components/portrait";
import { HEAVYWEIGHT } from "../components/constants";

describe("Portrait", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Portrait setPortraitTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a portrait text box", () => {
    const portraitField = screen.getByLabelText("portrait");

    expect(portraitField).toBeInTheDocument();
    expect(portraitField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const portraitFlavour = screen.getByText("Finally... a .");
    const portraitLabel = screen.getByText("portrait");

    expect(portraitFlavour).toBeInTheDocument();
    expect(portraitLabel).toBeInTheDocument();
  });
});
