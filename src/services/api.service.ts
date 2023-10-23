import {
	EVERYTHING_REQUEST_SCHEMA,
	EVERYTHING_RESPONSE_SCHEMA,
	HEADLINES_REQUEST_SCHEMA,
	HEADLINES_RESPONSE_SCHEMA,
	SOURCES_REQUEST_SCHEMA,
	SOURCES_RESPONSE_SCHEMA,
} from "@/services/api.schema";
import {
	Credentials,
	EndpointIdentifier,
	EndpointOptions,
	EndpointResponse,
	RestClient,
	defineEndpoints,
	http,
	rest,
} from "@diba1013/rest";

const mocked = import.meta.glob("../assets/mock/*.json", {
	as: "raw",
});

const endpoints = defineEndpoints({
	headlines: {
		method: "get",
		path: "/v2/top-headlines",
		request: {
			type: "application/json",
			schema: HEADLINES_REQUEST_SCHEMA,
		},
		response: {
			type: "application/json",
			schema: HEADLINES_RESPONSE_SCHEMA,
		},
	},
	world: {
		method: "get",
		path: "/v2/everything",
		request: {
			type: "application/json",
			schema: EVERYTHING_REQUEST_SCHEMA,
		},
		response: {
			type: "application/json",
			schema: EVERYTHING_RESPONSE_SCHEMA,
		},
	},
	sources: {
		method: "get",
		path: "/v2/top-headlines/sources",
		request: {
			type: "application/json",
			schema: SOURCES_REQUEST_SCHEMA,
		},
		response: {
			type: "application/json",
			schema: SOURCES_RESPONSE_SCHEMA,
		},
	},
});

export type NewsEndpoints = typeof endpoints;
export type NewsEndpointIdentifier = EndpointIdentifier<NewsEndpoints>;
export type NewsEndpointOptions<ID extends NewsEndpointIdentifier> =
	EndpointOptions<NewsEndpoints, ID>;
export type NewsEndpointResponse<ID extends NewsEndpointIdentifier> =
	EndpointResponse<NewsEndpoints, ID>;

export type APIProvider = {
	credentials: Credentials;
};

export class API {
	private readonly $proxy: RestClient<NewsEndpoints>;

	constructor({ credentials }: APIProvider) {
		this.$proxy = rest({
			endpoints,
			fetch: http({
				url: "https://newsapi.org/",
				credentials,
			}),
		});
	}

	async execute<ID extends NewsEndpointIdentifier>(
		id: ID,
		request: NewsEndpointOptions<ID>,
	): Promise<NewsEndpointResponse<ID>> {
		const contents = await mocked[`../assets/mock/${id}.json`]?.();
		if (contents !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const json = JSON.parse(contents);
			return json as NewsEndpointResponse<ID>;
		}

		return await this.$proxy.execute(id, request);
	}
}
