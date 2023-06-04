import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      desktop: "1200px",
      tablet: "768px",
      mobile: "320px",
    },
    extend: {},
  },
  plugins: [],
});
