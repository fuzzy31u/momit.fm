import nextConfig from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextConfig,
  ...coreWebVitals,
  {
    rules: {
      "@next/next/no-html-link-for-pages": ["error", "pages"],
    },
  },
];

export default config;
