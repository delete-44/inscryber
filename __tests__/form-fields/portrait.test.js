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

  it("renders a field upload field and hides status indicators by default", () => {
    const fileField = screen.getByLabelText("portrait");
    const error = screen.getByRole("alert");
    const spinner = screen.getByRole("status");

    expect(fileField).toBeInTheDocument();
    expect(fileField).not.toBeDisabled();

    expect(error).toHaveClass("hidden");
    expect(spinner).toHaveClass("hidden");
  });

  it("renders a flavourful description", () => {
    const fileFlavour = screen.getByText("Finally... a .");
    const fileLabel = screen.getByText("portrait");

    expect(fileFlavour).toBeInTheDocument();
    expect(fileLabel).toBeInTheDocument();
  });

  it("renders privacy warning & help text", () => {
    const privacyText = screen.getByText(
      /Please review how we handle images in the privacy section of our before uploading./
    );
    const aboutLink = screen.getByRole("link", { name: "about page" });
    const helpText = screen.getByText(
      /Images are scaled to fit dimensions 624x512. For best results, use an image at least this size, with a transparent background./
    );

    expect(privacyText).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(helpText).toBeInTheDocument();
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

        expect(fileField).not.toBeDisabled();
        expect(error).toHaveClass("hidden");
        expect(spinner).toHaveClass("hidden");
      });
    });

    it("correctly replaces invalid chars from response", async () => {
      const fileField = screen.getByLabelText("portrait");

      userEvent.upload(fileField, testFile);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);

        expect(mockCallback).toHaveBeenCalledWith(
          "l_fake:image:returned.webp,y_-80/"
        );
      });
    });
  });

  describe("when response is error", () => {
    beforeEach(() => {
      fetch.mockRejectOnce("Test error");
    });

    it("successfully manages state as image upload fails", async () => {
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
        expect(mockCallback).toHaveBeenCalledTimes(0);

        expect(fileField).not.toBeDisabled();
        expect(error).not.toHaveClass("hidden");
        expect(spinner).toHaveClass("hidden");
      });
    });
  });
});
