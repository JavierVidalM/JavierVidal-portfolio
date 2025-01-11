/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        inner: "inset 0px 0px 12px 5px #e2e8f01f;",
      },
      borderWidth: {
        1: "1px",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        25: "repeat(25, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        25: "repeat(25, minmax(0, 1fr))",
      },
      scrollbar: {
        hidden: {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities, theme }) {
      const colors = theme('colors');
      const spacing = theme('spacing');
      const borderRadius = theme('borderRadius');

      const scrollbarColors = Object.keys(colors).reduce((acc, color) => {
        if (typeof colors[color] === 'string') {
          acc[`.scrollbar-bg-${color}`] = {
            '&::-webkit-scrollbar-track': {
              backgroundColor: colors[color],
            },
          };
          acc[`.scrollbar-${color}`] = {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors[color],
            },
          };
        } else {
          Object.keys(colors[color]).forEach((shade) => {
            acc[`.scrollbar-bg-${color}-${shade}`] = {
              '&::-webkit-scrollbar-track': {
                backgroundColor: colors[color][shade],
              },
            };
            acc[`.scrollbar-${color}-${shade}`] = {
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors[color][shade],
              },
            };
          });
        }
        return acc;
      }, {});

      const scrollbarSizes = Object.keys(spacing).reduce((acc, size) => {
        acc[`.scrollbar-w-${size}`] = {
          '&::-webkit-scrollbar': {
            width: spacing[size],
            height: spacing[size],
          },
        };
        return acc;
      }, {});

      const scrollbarRadii = Object.keys(borderRadius).reduce((acc, radius) => {
        acc[`.scrollbar-rounded-${radius}`] = {
          '&::-webkit-scrollbar-thumb': {
            borderRadius: borderRadius[radius],
          },
        };
        return acc;
      }, {});

      addUtilities({
        ".scroll-hidden": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ...scrollbarColors,
        ...scrollbarSizes,
        ...scrollbarRadii,
      });
    },
  ],
};