import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals") ,{
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-refresh": require("eslint-plugin-react-refresh"),
    },
    rules: {
      "react-refresh/only-export-components": "warn", // or "error"
    },
  },];

export default eslintConfig;
