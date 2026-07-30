/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030305',
        titanium: '#121216',
        cyan: {
          400: '#00f0ff',
          500: '#00d0e0',
        },
        emerald: {
          400: '#00ff9d',
        },
        amber: {
          400: '#ffaa00',
        },
        crimson: '#ff0055',
      },
    },
  },
  plugins: [],
};
