import type { Article } from "@/services/news.types";
import { ArticleListItem } from "@/components/ArticleListItem";
import { Component, For } from "solid-js";

export type ArticleListProperties = {
	articles: Article[];
};

export const ArticleList: Component<ArticleListProperties> = (properties) => {
	return (
		<ul class="grid flex-col gap-2 justify-center">
			<For each={properties.articles}>
				{(item) => <ArticleListItem article={item} />}
			</For>
		</ul>
	);
};
