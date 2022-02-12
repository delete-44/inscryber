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

  describe("when cloudinary upload is unsuccessful", () => {
    global.fetch = jest.fn(() =>
      Promise.reject()
    );

    it("renders an error message", async () => {
      const portraitField = screen.getByLabelText("portrait");
      let errorText = screen.queryByText("Error:");

      expect(portraitField).not.toBeDisabled();
      expect(errorText).toBe(null);

      userEvent.upload(portraitField, testFile);

      expect(portraitField).toBeDisabled();

      errorText = screen.queryByText("Error:");
      expect(errorText).toBe(null);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);

        expect(mockCallback).not.toHaveBeenCalled();

        expect(portraitField).not.toBeDisabled();
        errorText = screen.getByText("Error:");
        expect(errorText).toBeInTheDocument();
      });
    });
  });

  // describe("when cloudinary upload is successful", () => {
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(testResponse),
  //     })
  //   );

  //   it("correctly strips invalid characters from generated url", async () => {
  //     const portraitField = screen.getByLabelText("portrait");

  //     expect(portraitField).not.toBeDisabled();

  //     userEvent.upload(portraitField, testFile);

  //     expect(portraitField).toBeDisabled();

  //     await waitFor(() => {
  //       expect(global.fetch).toHaveBeenCalledTimes(1);

  //       expect(mockCallback).toHaveBeenCalledWith(
  //         "l_folder:v1_mock_image.png,c_fit,h_512,w_624,y_-80/"
  //       );

  //       expect(portraitField).not.toBeDisabled();
  //     });
  //   });

  //   it("completely removes the transformation when field is empty", async () => {
  //     const portraitField = screen.getByLabelText("portrait");

  //     expect(portraitField).not.toBeDisabled();

  //     userEvent.upload(portraitField, testFile);

  //     expect(portraitField).toBeDisabled();

  //     await waitFor(() => {
  //       expect(global.fetch).toHaveBeenCalledTimes(1);
  //       expect(mockCallback).toHaveBeenCalledWith(
  //         "l_folder:v1_mock_image.png,c_fit,h_512,w_624,y_-80/"
  //       );

  //       expect(portraitField).not.toBeDisabled();
  //     });

  //     userEvent.upload(portraitField, "");

  //     expect(portraitField).not.toBeDisabled();

  //     await waitFor(() => {
  //       expect(global.fetch).toHaveBeenCalledTimes(1);
  //       expect(mockCallback).toHaveBeenCalledWith("");
  //       expect(portraitField).not.toBeDisabled();
  //     });
  //   });
  // });
});
