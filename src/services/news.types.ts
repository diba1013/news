import {
	CATEGORY_SCHEMA,
	COUNTRY_SCHEMA,
	EVERYTHING_REQUEST_SCHEMA,
	HEADLINES_REQUEST_SCHEMA,
	LANGUAGE_SCHEMA,
	SOURCE_ID_SCHEMA,
	SOURCES_REQUEST_SCHEMA,
} from "@/services/api.schema";
import { z } from "zod";

export type Category = z.infer<typeof CATEGORY_SCHEMA>;
export type Language = z.infer<typeof LANGUAGE_SCHEMA>;
export type Country = z.infer<typeof COUNTRY_SCHEMA>;

export type Article = {
	source: Source;
	author?: string;
	title: string;
	description?: string;
	content?: string;
	url: URL;
	urlToImage?: URL;
	publishedAt: Date;
};
export type SourceID = z.infer<typeof SOURCE_ID_SCHEMA>;
export type Source = {
	id: SourceID;
	name: string;
	description?: string;
	url?: URL;
	category?: Category;
	language?: Language;
	country?: Country;
};

export type SourcesRequest = {
	request: z.output<typeof SOURCES_REQUEST_SCHEMA>;
	signal?: AbortSignal;
};
export type SourcesResponse = Record<SourceID, Source>;

export type HeadlinesRequest = {
	request: z.input<typeof HEADLINES_REQUEST_SCHEMA>;
	config: {
		sources: SourcesResponse;
	};
	signal?: AbortSignal;
};

export type EverythingRequest = {
	request: z.input<typeof EVERYTHING_REQUEST_SCHEMA>;
	config: {
		sources: SourcesResponse;
	};
	signal?: AbortSignal;
};

export type ArticlesResponse = {
	total: number;
	articles: Article[];
};

export interface NewsService {
	sources(request: SourcesRequest): Promise<SourcesResponse>;

	headlines(request: HeadlinesRequest): Promise<ArticlesResponse>;

	everything(request: EverythingRequest): Promise<ArticlesResponse>;
}
