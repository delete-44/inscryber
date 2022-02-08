module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#fff1e7",
          400: "#cc6f33",
        },
        red: "#b72e38",
      },
      fontFamily: {
        title: ["Heavyweight"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.orange.400"),
            fontFamily: theme("fontFamily.title"),

            h1: {
              textShadow: "0 0 0.07em #d68c5c",
              fontSize: theme("fontSize.7xl"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
