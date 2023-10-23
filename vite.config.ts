import { fileURLToPath } from "node:url";
import uno from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("src", import.meta.url)),
		},
	},
	plugins: [
		// Solid
		solid({
			ssr: true,
			typescript: {
				isTSX: true,
				allExtensions: true,
			},
		}),
		uno(),
	],
});
