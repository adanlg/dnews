import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'times': ['"Times New Roman"', 'serif'], // Adding Times New Roman
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
              maxWidth: '100%',
            },
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // other plugins...
  ],
};

export default config;
