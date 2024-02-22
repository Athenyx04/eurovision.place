import { getViteConfig } from "astro/config";
import type { UserConfig } from "vitest";

export default getViteConfig({
  test: {
    // Vitest configuration options
    globals: true,
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/tests/e2e/**"],
  },
});
