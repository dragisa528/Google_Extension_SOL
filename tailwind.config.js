/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./public/index.html",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [ require('flowbite/plugin')],
  variants:{},
  theme:{
    extend:{
     
      fontFamily:{
        forma:"var(--font-forma)",
        helvetica:"var(--font-helvetica)",
        freightsans:"var(--font-freightsans)",
        proxima:"var(--font-proxima)",
        noto:"var(--font-noto)",
        mont:"var(--font-mont)",
      },
      colors:{
        // "blue":"var(--color-blue)",
        // "gray":{
        //   100:"var(--color-gray-100)",
        //   200:"var(--color-gray-200)",
        //   300:"var(--color-gray-300)"
        // },
        "yellow":"var(--color-yellow)"
      }
    },
    screens:{
      xs: '220px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },

}
