import { UserConfig, defineConfig, presetUno, presetWebFonts } from "unocss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: UserConfig<any> = defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			fonts: {
				sans: [
					{
						provider: "fontshare",
						name: "Hind",
						weights: [400, 700],
					},
				],
				mono: [
					{
						provider: "fontshare",
						name: "Pilcrow Rounded",
						weights: [400, 700],
					},
				],
			},
		}),
	],
});

export default config;
