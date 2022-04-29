import config from "tailwind.config";
const colors = config.theme.extend.colors;

export const styleBuilder = (color) => {
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

export const themeBuilder = (color) => {
  return (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      neutral0: colors[color]["100"], // Background color
      neutral5: colors[color]["100"], // Background color for readonly control
      neutral10: colors[color]["300"], // Multi-select selected options background
      neutral40: "#424242", // "No options" message color
      neutral50: "#424242", // Placeholder color
      neutral80: "#000000", // Multi-select selected options text
      primary: colors[color]["400"], // Border & option highlight color
      primary25: colors[color]["200"], // Hover color
    },
  });
};
