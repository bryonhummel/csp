// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    plugins: ["prettier-plugin-tailwindcss"],
  };

// prettier.config.js
module.exports = {
  tailwindConfig: './tailwind.config.js',
}

export default config;