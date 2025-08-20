export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: "640px",   // Small devices (mobile landscape)
      md: "768px",   // Medium devices (tablets)
      lg: "1024px",  // Large devices (small laptops)
      xl: "1280px",  // Extra large (desktops)
      "2xl": "1536px" // Very large desktops
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
    },
  },
  plugins: [],
};


