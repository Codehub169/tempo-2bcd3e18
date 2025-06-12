/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2196F3',        // Blue: Used for primary buttons, key accents, and branding elements.
        'secondary': '#4CAF50',      // Green: Represents health, well-being; for success indicators, secondary buttons.
        'accent': '#FF9800',         // Orange: Warm, inviting color for calls-to-action (CTAs).
        'neutral': {
          'white': '#FFFFFF',
          'light-gray': '#F5F5F5',       // For backgrounds
          'medium-light-gray': '#EEEEEE', // For borders, dividers
          'gray': '#757575',             // For secondary text, disabled states
          'dark-gray': '#212121',        // For main text content, headings
        },
        'success': '#4CAF50',
        'warning': '#FFC107',
        'error': '#F44336',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'primary': ['Inter', 'sans-serif'], // Explicitly 'primary' font (body text, UI elements).
        'secondary': ['Poppins', 'sans-serif'], // 'secondary' font (headings, accents).
      },
    },
  },
  plugins: [],
};
