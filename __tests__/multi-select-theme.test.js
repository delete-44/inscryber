import * as themeConstants from "components/multi-select-theme";
import config from "tailwind.config";
const colors = config.theme.extend.colors;

describe("MultiSelectTheme", () => {
  describe("styleBuilder", () => {
    const res = themeConstants.styleBuilder("orange");

    it("inserts provided colour to control function", () => {
      expect(res.control()).toEqual({
        borderBottom: `2px solid ${colors["orange"]["400"]}`,
        fontSize: "1.5rem",
      });
    });

    it("returns standard singleValue block", () => {
      expect(res.singleValue()).toEqual({
        color: "black",
      });
    });
  });

  describe("themeBuilder", () => {
    const res = themeConstants.themeBuilder("blue");

    it("retrieves correct colours for different theme elements", () => {
      expect(res({ colors: {} })).toEqual({
        colors: {
          neutral0: colors["blue"]["100"],
          neutral5: colors["blue"]["100"],
          neutral10: colors["blue"]["300"],
          neutral40: "#424242",
          neutral50: "#424242",
          neutral80: "#000000",
          primary: colors["blue"]["400"],
          primary25: colors["blue"]["200"],
        },
      });
    });
  });
});
