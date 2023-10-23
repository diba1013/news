import type { ServiceProvider } from "@/services/di.types";
import { inject } from "@diba1013/di";

export function defineServices(): ServiceProvider {
	return inject<ServiceProvider>({
		config: ({ decorator }) => {
			return decorator.constant(() => {
				return {
					api: {
						token: import.meta.env.VITE_API_TOKEN || "",
					},
				};
			});
		},

		news: ({ decorator }) => {
			return decorator.factory(async ({ config }) => {
				// Allow for code-splitting
				const [{ API }, { DelegatingNewsService }] = await Promise.all([
					import("@/services/api.service"), //
					import("@/services/news.service"), //
				]);
				return new DelegatingNewsService({
					api: new API({
						credentials: {
							type: "bearer",
							token: config.api.token,
						},
					}),
				});
			});
		},
	});
}
