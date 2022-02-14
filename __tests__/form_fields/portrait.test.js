import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Portrait from "@form_fields/portrait";
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
