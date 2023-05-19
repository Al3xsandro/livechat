/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        fade: "fadeOut 0.5s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: theme("opacity.0") },
          "100%": { opacity: theme("opacity.100") },
        },
      }),
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};