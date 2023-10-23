import type { NewsService } from "@/services/news.types";

export type ApplicationConfiguration = {
	api: {
		token: string;
	};
};

export type ServiceProvider = {
	config: ApplicationConfiguration;

	news: NewsService;
};
