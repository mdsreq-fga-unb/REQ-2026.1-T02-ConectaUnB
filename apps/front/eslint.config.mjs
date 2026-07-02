import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Regra nova do React 19 que flagriza setState dentro de effects.
      // O padrão de fetch-on-mount é intentional em várias páginas; refatorar
      // para useSyncExternalStore fica fora de escopo.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
