/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

module.exports = {
  purge: {
    // enabled: true,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
  },
  // important: false,
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      body: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue',
        'Arial', 'Noto Sans', 'sans-serif'
      ],
    },
    extend: {
      colors: {
        'gray-light': 'rgba(219, 219, 219, 1)',
        'gray': 'rgba(176, 181, 179, 1)',
        'gray-dark': 'rgba(112, 111, 111, 1)',
        'pink-1': 'rgba(239, 39, 166, 1)',
        'pink-2': 'rgba(255, 41, 156, 1)',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
