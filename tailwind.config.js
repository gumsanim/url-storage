import withMT from '@material-tailwind/react/utils/withMT'

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      lg: { max: '1200px' },
      md: { max: '768px' },
      sm: { max: '320px' },
    },
    extend: {},
  },
  plugins: [],
})
