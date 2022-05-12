import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImagePreview from "components/image-preview";

describe("ImagePreview", () => {
  const mockCallback = jest.fn();
  const mockUrl = "https://www.test.com";

  beforeEach(async () => {
    render(
      <ImagePreview
        setBusy={mockCallback}
        busy={false}
        url={"https://www.test.com"}
      />
    );
  });

  it("renders image & download link", async () => {
    const image = await screen.findByAltText("A preview of your custom card");
    const imageDownloadLink = screen.getByRole("link", {
      name: "Download Image",
    });

    expect(image).toBeInTheDocument();

    expect(imageDownloadLink).toBeInTheDocument();
    expect(imageDownloadLink).toHaveAttribute("href", mockUrl);
  });
});
