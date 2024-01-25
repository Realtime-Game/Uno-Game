/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        mono: ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'main-board': "url('./assets/bgR.png')",
        'gif': "url('/src/assets/Landing-Page.gif')",
      },
    },
  },
  plugins: [require("daisyui")],
}