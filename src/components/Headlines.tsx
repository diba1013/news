import { ArticleList } from "@/components/ArticleList";
import { useHeadlines } from "@/store/headline.store";
import { Component } from "solid-js";

export const Headlines: Component = () => {
	const headlines = useHeadlines();

	return (
		<div class="grid p-4 overflow-auto">
			<ArticleList articles={headlines.articles} />
		</div>
	);
};
