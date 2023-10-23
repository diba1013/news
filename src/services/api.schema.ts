import { z } from "zod";

export const STRING_SCHEMA = z.string();
export const URL_SCHEMA = z
	.string()
	.url()
	.transform((url) => new URL(url));
export const DATE_TIME_SCHEMA = z
	.string()
	.datetime()
	.transform((date) => {
		return new Date(date);
	});

export const COUNTRY_SCHEMA = z.enum([
	"ae",
	"ar",
	"at",
	"au",
	"be",
	"bg",
	"br",
	"ca",
	"ch",
	"cn",
	"co",
	"cu",
	"cz",
	"de",
	"eg",
	"fr",
	"gb",
	"gr",
	"hk",
	"hu",
	"id",
	"ie",
	"il",
	"in",
	"it",
	"jp",
	"kr",
	"lt",
	"lv",
	"ma",
	"mx",
	"my",
	"ng",
	"nl",
	"no",
	"nz",
	"ph",
	"pl",
	"pt",
	"ro",
	"rs",
	"ru",
	"sa",
	"se",
	"sg",
	"si",
	"sk",
	"th",
	"tr",
	"tw",
	"ua",
	"us",
	"ve",
	"za",
]);

export const LANGUAGE_SCHEMA = z.enum([
	"ar",
	"de",
	"en",
	"es",
	"fr",
	"he",
	"it",
	"nl",
	"no",
	"pt",
	"ru",
	"sv",
	"ud",
	"zh",
]);

export const CATEGORY_SCHEMA = z.enum([
	"business",
	"entertainment",
	"general",
	"health",
	"science",
	"sports",
	"technology",
]);

export const SOURCE_ID_SCHEMA = z.string();

export const SOURCE_SCHEMA = z.object({
	id: SOURCE_ID_SCHEMA,
	name: STRING_SCHEMA,
	description: STRING_SCHEMA,
	url: URL_SCHEMA,
	category: CATEGORY_SCHEMA,
	language: LANGUAGE_SCHEMA,
	country: COUNTRY_SCHEMA,
});

export const ARTICLE_SCHEMA = z.object({
	source: z.object({
		id: SOURCE_ID_SCHEMA.nullable(),
		name: STRING_SCHEMA,
	}),
	author: STRING_SCHEMA.nullable(),
	title: STRING_SCHEMA,
	description: STRING_SCHEMA.nullable().default(""),
	url: URL_SCHEMA,
	urlToImage: URL_SCHEMA.nullable(),
	publishedAt: DATE_TIME_SCHEMA,
	content: STRING_SCHEMA.nullable().default(""),
});

export const ERROR_RESPONSE_SCHEMA = z.object({
	status: z.enum(["error"]),
	code: z.string(),
	message: z.string(),
});

export const ARTICLES_RESPONSE_SCHEMA = z.union([
	z.object({
		status: z.enum(["ok"]),
		totalResults: z.number().int(),
		articles: z.array(ARTICLE_SCHEMA),
	}),
	ERROR_RESPONSE_SCHEMA,
]);

export const HEADLINES_REQUEST_SCHEMA = z.union([
	z.object({
		country: COUNTRY_SCHEMA.optional(),
		category: CATEGORY_SCHEMA.optional(),
		q: z.string().optional(),
		pageSize: z.number().int().min(1).max(100).optional(),
		page: z.number().int().min(1).optional(),
	}),
	z.object({
		sources: z
			.array(SOURCE_ID_SCHEMA)
			.transform((sources) => sources.join(","))
			.optional(),
		q: z.string().optional(),
		pageSize: z.number().int().min(1).max(100).optional(),
		page: z.number().int().min(1).optional(),
	}),
]);

export const HEADLINES_RESPONSE_SCHEMA = ARTICLES_RESPONSE_SCHEMA;

export const EVERYTHING_REQUEST_SCHEMA = z.object({
	q: STRING_SCHEMA.max(500).optional(),
	searchIn: z
		.array(z.enum(["title", "description", "content"]))
		.transform((filters) => {
			return filters.join(",");
		})
		.optional(),
	sources: z
		.array(SOURCE_ID_SCHEMA)
		.max(20)
		.transform((sources) => {
			return sources.join(",");
		})
		.optional(),
	domains: z
		.array(STRING_SCHEMA)
		.transform((domains) => {
			return domains.join(",");
		})
		.optional(),
	excludeDomains: z
		.array(STRING_SCHEMA)
		.transform((domains) => {
			return domains.join(",");
		})
		.optional(),
	from: z
		.date()
		.transform((date) => {
			return date.toISOString();
		})
		.optional(),
	to: z
		.date()
		.transform((date) => {
			return date.toISOString();
		})
		.optional(),
	language: LANGUAGE_SCHEMA.optional(),
	sortBy: z.enum(["relevancy", "popularity", "publishedAt"]).optional(),
	pageSize: z.number().int().min(1).max(100).optional(),
	page: z.number().int().min(1).optional(),
});

export const EVERYTHING_RESPONSE_SCHEMA = ARTICLES_RESPONSE_SCHEMA;

export const SOURCES_REQUEST_SCHEMA = z.object({
	category: CATEGORY_SCHEMA.optional(),
	language: LANGUAGE_SCHEMA.optional(),
	country: COUNTRY_SCHEMA.optional(),
});

export const SOURCES_RESPONSE_SCHEMA = z.union([
	z.object({
		status: z.enum(["ok"]),
		sources: z.array(SOURCE_SCHEMA),
	}),
	ERROR_RESPONSE_SCHEMA,
]);
