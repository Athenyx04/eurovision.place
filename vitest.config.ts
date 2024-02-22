import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    // Vitest configuration options
    globals: true,
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/test/e2e/**"],
  },
});
