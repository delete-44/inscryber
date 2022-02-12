import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Portrait from "../components/portrait";

describe("Portrait", () => {
  const mockCallback = jest.fn();
  const testFile = new File(["Test"], "test.png", { type: "image/png" });
  const testResponse = {
    url: "http://res.cloudinary.com/mock-entry/image/upload/folder/v1_mock_image.png",
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testResponse),
    })
  );

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

  it("correctly strips invalid characters from generated url", async () => {
    const portraitField = screen.getByLabelText("portrait");

    userEvent.upload(portraitField, testFile);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(mockCallback).toHaveBeenCalledWith(
        "l_folder:v1_mock_image.png,c_fit,h_512,w_624,y_-80/"
      );
    });
  });

  it("completely removes the transformation when field is empty", async () => {
    const portraitField = screen.getByLabelText("portrait");

    userEvent.upload(portraitField, testFile);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        "l_folder:v1_mock_image.png,c_fit,h_512,w_624,y_-80/"
      );
    });

    userEvent.upload(portraitField, "");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith("");
    });
  });
});
