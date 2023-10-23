import type { API } from "@/services/api.service";
import type {
	Article,
	ArticlesResponse,
	EverythingRequest,
	HeadlinesRequest,
	NewsService,
	SourcesRequest,
	SourcesResponse,
} from "@/services/news.types";

export type DelegatingNewsServiceProvider = {
	api: API;
};

export class DelegatingNewsService implements NewsService {
	private readonly $api: API;

	constructor({ api }: DelegatingNewsServiceProvider) {
		this.$api = api;
	}

	async sources({
		request,
		signal,
	}: SourcesRequest): Promise<SourcesResponse> {
		const raw = await this.$api.execute("sources", {
			request,
			signal,
		});
		// TODO add notification store to handle errors
		if (raw.status === "error") {
			throw new Error(raw.message);
		}

		const config: SourcesResponse = {};
		for (const source of raw.sources) {
			config[source.id] = source;
		}
		return config;
	}

	async headlines({
		request,
		signal,
		config,
	}: HeadlinesRequest): Promise<ArticlesResponse> {
		const raw = await this.$api.execute("headlines", {
			request,
			signal,
		});
		// TODO add notification store to handle errors
		if (raw.status === "error") {
			throw new Error(raw.message);
		}

		// TODO remove duplicate code and handle enrichment within api?
		return {
			total: raw.totalResults,
			articles: raw.articles.map(
				({
					source,
					author,
					title,
					description,
					content,
					url,
					urlToImage,
					publishedAt,
				}): Article => {
					return {
						source: config.sources[source.id ?? ""] ?? {
							id: source.id ?? "",
							name: source.name,
						},
						author: author ?? undefined,
						title,
						description: description ?? undefined,
						content: content ?? undefined,
						url,
						urlToImage: urlToImage ?? undefined,
						publishedAt,
					};
				},
			),
		};
	}

	async everything({
		request,
		signal,
		config,
	}: EverythingRequest): Promise<ArticlesResponse> {
		const raw = await this.$api.execute("world", {
			request,
			signal,
		});
		// TODO add notification store to handle errors
		if (raw.status === "error") {
			throw new Error(raw.message);
		}

		// TODO remove duplicate code and handle enrichment within api?
		return {
			total: raw.totalResults,
			articles: raw.articles.map(
				({
					source,
					author,
					title,
					description,
					content,
					url,
					urlToImage,
					publishedAt,
				}) => {
					return {
						source: config.sources[source.id ?? ""] ?? {
							id: source.id ?? "",
							name: source.name,
						},
						author: author ?? undefined,
						title,
						description: description ?? undefined,
						content: content ?? undefined,
						url,
						urlToImage: urlToImage ?? undefined,
						publishedAt,
					};
				},
			),
		};
	}
}
