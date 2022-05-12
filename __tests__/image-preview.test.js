import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImagePreview from "components/image-preview";

describe("ImagePreview", () => {
  const mockCallback = jest.fn();
  const mockUrl = "https://www.test.com";

  it("renders image & download link", async () => {
    render(
      <ImagePreview
        setBusy={mockCallback}
        busy={false}
        url={"https://www.test.com"}
      />
    );

    const image = await screen.findByAltText("A preview of your custom card");
    const imageDownloadLink = screen.getByRole("link", {
      name: "Download Image",
    });

    const busySpinner = screen.getByRole("status");
    const errorAlert = screen.getByRole("alert");

    expect(image).not.toHaveClass("hidden");
    expect(imageDownloadLink).not.toHaveClass("hidden");
    expect(imageDownloadLink).toHaveAttribute("href", mockUrl);

    expect(busySpinner).toHaveClass("hidden");
    expect(errorAlert).toHaveClass("hidden");
  });

  it("hides the image & download link when busy", async () => {
    render(
      <ImagePreview
        setBusy={mockCallback}
        busy={true}
        url={"https://www.test.com"}
      />
    );

    const image = await screen.findByAltText("A preview of your custom card");
    const imageDownloadLink = screen.getByRole("link", {
      name: "Download Image",
    });

    const busySpinner = screen.getByRole("status");
    const errorAlert = screen.getByRole("alert");

    expect(image).not.toHaveClass("hidden");
    expect(imageDownloadLink).toHaveClass("hidden");
    expect(imageDownloadLink).toHaveAttribute("href", mockUrl);

    expect(busySpinner).not.toHaveClass("hidden");
    expect(errorAlert).toHaveClass("hidden");
  });
});
