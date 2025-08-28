/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'bg-white', 'bg-gray-900', 'bg-gray-50', 'bg-orange-50',
    'text-gray-900', 'text-white', 'text-gray-800', 'text-orange-900'
  ],
  theme: { extend: {} },
  plugins: [],
};