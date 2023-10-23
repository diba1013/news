import type { ServiceProvider } from "@/services/di.types";
import type { ArticlesResponse, HeadlinesRequest } from "@/services/news.types";
import { useSourcesStore } from "@/store/sources.store";
import { defineService, defineStore, wrap } from "@diba1013/solid";

export const useHeadlines = defineStore(
	"news:headlines",
	({ news }: ServiceProvider) => {
		const sources = useSourcesStore();

		const headlines = defineService<
			Pick<HeadlinesRequest, "request" | "config">,
			ArticlesResponse
		>("news:headlines:fetch", {
			data: () => {
				return {
					data: {
						request: {
							category: "technology",
							country: "us",
						},
						config: {
							sources: sources.sources!,
						},
					},
				};
			},

			execute: async ({ data: { request, config }, signal }) => {
				return await news.headlines({
					request,
					config,
					signal,
				});
			},
		});

		return {
			articles: wrap({
				get() {
					const response = headlines.resource();
					return response?.articles ?? [];
				},
			}),
		};
	},
);
