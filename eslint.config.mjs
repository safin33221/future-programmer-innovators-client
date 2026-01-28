import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Next.js recommended (includes React + Next rules)
  ...nextVitals,
  ...nextTs,

  // Build-safe ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),

  // Project-level overrides
  {
    rules: {
      // Prevent build breaks for common prod cases
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",

      // Next.js / React practical settings
      "react/react-in-jsx-scope": "off", // Next.js auto React
      "react-hooks/exhaustive-deps": "warn",

      // Console allowed (useful in server actions / logs)
      "no-console": "off",
    },
  },
]);
