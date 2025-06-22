/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{vue,html,js,ts,jsx,tsx}",
    ],
      safelist: [
    'bg-red-500',
    'bg-blue-500', 
    'bg-green-600',
    'text-white',
    'text-green-600',
    'border-purple-500'
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}

