import type { Article } from "@/services/news.types";
import { Component } from "solid-js";

export type ArticleListItemProperties = {
	article: Article;
};

export const ArticleListItem: Component<ArticleListItemProperties> = (
	properties,
) => {
	return (
		<div class="flex flex-col gap-1 bg-neutral-900 rounded text-gray-300 relative isolate overflow-hidden apect-video max-w-sm p-2 gap-3">
			<img
				class="object-cover aspect-square rounded filter-brightness-90 filter-contrast-90"
				src={properties.article.urlToImage}
				alt="Image"
			/>
			<h5 class="font-mono font-bold uppercase">
				{properties.article.title}
			</h5>
		</div>
	);
};
