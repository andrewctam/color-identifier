/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "": "75vh",
      },
      
      maxWidth: {
        "1/2": "50%",
      }
    }, 
  },
  plugins: [],
}
