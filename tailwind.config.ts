import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'times': ['"Times New Roman"', 'serif'], // Adding Times New Roman font
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
              maxWidth: '100%',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add other plugins here if needed...
  ],
};

export default config;
