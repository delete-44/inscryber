module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#fff1e7",
          400: "#cc6f33",
        },
        red: "#b72e38",
        gray: "#424242",
      },
      fontFamily: {
        title: ["Heavyweight"],
      },
    },
  },
  plugins: [],
};
