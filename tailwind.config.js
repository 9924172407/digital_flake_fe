/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#662671",
        secondaryColor: "#5C218B",
        textPrimary: "#fff",
        grayColor: "#F4F4F4",
        borderColor: "#B0ADAD",
      },
    },
  },
  plugins: [],
};
