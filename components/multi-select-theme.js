import config from "tailwind.config";
const colors = config.theme.extend.colors;

const styleBuilder = (color) => {
  return {
    control: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontSize: "1.5rem",
        borderBottom: `2px solid ${colors[color]["400"]}`,
      };
    },
    singleValue: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "black",
      };
    },
  };
};

export const SELECT_STYLES = styleBuilder("orange");
export const PO3_SELECT_STYLES = styleBuilder("blue");

const themeBuilder = (color) => {
  return (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: colors[color]["200"], // Hover color
      primary: colors[color]["400"], // Border & option highlight color
      neutral0: colors[color]["100"], // Background color
      neutral10: colors[color]["300"], // Multi-select selected options background
      neutral40: "#424242", // "No options" message color
      neutral50: "#424242", // Placeholder color
      neutral80: "#000000", // Multi-select selected options text
    },
  });
};

export const SELECT_THEME = themeBuilder("orange");
export const PO3_SELECT_THEME = themeBuilder("blue");
