import type { ServiceProvider } from "@/services/di.types";
import type { SourcesRequest, SourcesResponse } from "@/services/news.types";
import { defineService, defineStore, wrap } from "@diba1013/solid";

export const useSourcesStore = defineStore(
	"news:store",
	({ news }: ServiceProvider) => {
		const { resource } = defineService<
			SourcesRequest["request"],
			SourcesResponse
		>("news:store:fetch", {
			data: () => {
				return {
					data: {},
				};
			},

			execute: async ({ data: request, signal }) => {
				return await news.sources({
					request,
					signal,
				});
			},

			recover: () => {
				return {};
			},
		});

		// TODO move this remapping to solid
		return {
			loading: wrap({
				get: () => {
					return resource.loading;
				},
			}),

			sources: wrap({
				get: () => {
					return resource();
				},
			}),
		};
	},
);
