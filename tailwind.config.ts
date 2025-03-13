import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";
import svgToDataUri from "mini-svg-data-uri";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

// Custom plugin for background utilities
const customBackgrounds = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      "bg-grid": (value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
});

// Function to add CSS variables for colors
function addVariablesForColors({
  addBase,
  theme,
}: {
  addBase: (styles: Record<string, Record<string, string>>) => void;
  theme: (path: string) => Record<string, unknown>;
}) {
  function flattenColors(
    obj: Record<string, unknown>,
    prefix = ""
  ): Record<string, string> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = prefix ? `${prefix}-${key}` : key;

      if (typeof value === "string" || typeof value === "number") {
        acc[`--${newKey}`] = String(value);
      } else if (typeof value === "object" && value !== null) {
        Object.assign(acc, flattenColors(value as Record<string, unknown>, newKey));
      }
      return acc;
    }, {} as Record<string, string>);
  }

  const allColors = theme("colors") as Record<string, unknown>;
  const newVars = flattenColors(allColors);

  addBase({
    ":root": newVars,
  });
}

// Tailwind Config
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssAnimate, 
    addVariablesForColors, 
    customBackgrounds,
  ],
};

export default config;
