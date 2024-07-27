/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // Replace with your desired primary color
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#50B8E2", // Replace with your desired primary color
      }),
    },
  },
  plugins: [],
};
