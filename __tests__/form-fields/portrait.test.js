import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Portrait from "@form-fields/portrait";
import userEvent from "@testing-library/user-event";

describe("Portrait", () => {
  const mockCallback = jest.fn();
  const testFile = new File(["Test"], "test.png", { type: "image/png" });

  beforeEach(() => {
    render(<Portrait setPortraitTF={mockCallback} />);
    fetch.resetMocks();

    jest.clearAllMocks();
  });

  it("renders uploader & inscryber", () => {
    // Form elements
    const fileField = screen.getByLabelText("portrait");
    const error = screen.getByRole("alert");
    const spinner = screen.getByRole("status");

    expect(fileField).toBeInTheDocument();
    expect(fileField).not.toBeDisabled();

    expect(error).toHaveClass("hidden");
    expect(spinner).toHaveClass("hidden");

    // Flavour text
    const fileFlavour = screen.getByText("Finally... a .");
    const fileLabel = screen.getByText("portrait");

    expect(fileFlavour).toBeInTheDocument();
    expect(fileLabel).toBeInTheDocument();

    const bleachCheck = screen.getByRole("checkbox", { name: /Bleach Colour/ });
    const distortCheck = screen.getByRole("checkbox", {
      name: /Distort Edges/,
    });
    const removeBGCheck = screen.getByRole("checkbox", {
      name: /Remove Background/,
    });

    expect(bleachCheck).toBeInTheDocument();
    expect(bleachCheck).not.toBeChecked();

    expect(distortCheck).toBeInTheDocument();
    expect(distortCheck).not.toBeChecked();

    expect(removeBGCheck).toBeInTheDocument();
    expect(removeBGCheck).not.toBeChecked();
  });

  it("renders privacy warning & help text", () => {
    const privacyText = screen.getByText(
      /Please review how we handle images in the privacy section of our before uploading./
    );
    const aboutLink = screen.getByRole("link", { name: "about page" });
    const helpText = screen.getByText(
      /Images are scaled to fit dimensions 625x514. For best results, use an image at least this size, with a transparent background./
    );

    expect(privacyText).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(helpText).toBeInTheDocument();
  });

  it("does not set inscrybed transformations when no image uploaded", () => {
    const fileField = screen.getByLabelText("portrait");
    const error = screen.getByRole("alert");
    const spinner = screen.getByRole("status");
    const bleachCheck = screen.getByRole("checkbox", { name: /Bleach Colour/ });

    userEvent.click(bleachCheck);

    expect(fetch).toHaveBeenCalledTimes(0);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith({});

    expect(fileField).not.toBeDisabled();
    expect(error).toHaveClass("hidden");
    expect(spinner).toHaveClass("hidden");
  });

  describe("when response is successful", () => {
    beforeEach(() => {
      fetch.mockResponseOnce(
        JSON.stringify({
          public_id: "fake/image/returned",
        })
      );
    });

    it("successfully manages state as image uploaded", async () => {
      const fileField = screen.getByLabelText("portrait");
      const error = screen.getByRole("alert");
      const spinner = screen.getByRole("status");

      expect(fileField).not.toBeDisabled();
      expect(error).toHaveClass("hidden");
      expect(spinner).toHaveClass("hidden");

      userEvent.upload(fileField, testFile);

      expect(fileField).toBeDisabled();
      expect(error).toHaveClass("hidden");
      expect(spinner).not.toHaveClass("hidden");

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenLastCalledWith({
          portrait: { filename: "fake:image:returned", manipulations: [] },
        });

        expect(fileField).not.toBeDisabled();
        expect(error).toHaveClass("hidden");
        expect(spinner).toHaveClass("hidden");
      });
    });

    it("sets and unsets inscrybed transformations for uploaded image", async () => {
      const bleachCheck = screen.getByRole("checkbox", {
        name: /Bleach Colour/,
      });
      const fileField = screen.getByLabelText("portrait");

      userEvent.upload(fileField, testFile);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenLastCalledWith({
          portrait: {
            filename: "fake:image:returned",
            manipulations: [],
          },
        });
      });

      userEvent.click(bleachCheck);

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith({
        portrait: {
          filename: "fake:image:returned",
          manipulations: ["t_bleach_colour"],
        },
      });

      userEvent.click(bleachCheck);

      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback).toHaveBeenLastCalledWith({
        portrait: {
          filename: "fake:image:returned",
          manipulations: [],
        },
      });
    });

    it("correctly replaces invalid chars from response", async () => {
      const fileField = screen.getByLabelText("portrait");

      userEvent.upload(fileField, testFile);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);

        expect(mockCallback).toHaveBeenLastCalledWith({
          portrait: {
            filename: "fake:image:returned",
            manipulations: [],
          },
        });
      });
    });
  });
});
