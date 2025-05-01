/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        'screen-mid': '800px',
        'screen-sm': '600px',
        'screen-md': '700px',
      },
    },
  },
  plugins: [],
}

