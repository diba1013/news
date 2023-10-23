import type { Component } from "solid-js";
import { Headlines } from "@/components/Headlines";
import { defineServices } from "@/services/di.service";
import { Stores } from "@diba1013/solid";
import { render } from "solid-js/web";
import "virtual:uno.css";

const Root: Component = () => {
	const services = defineServices();

	return (
		<>
			<Stores.Provider value={{ context: services }}>
				<Headlines />
			</Stores.Provider>
		</>
	);
};

function init() {
	const root = document.querySelector("#app") ?? undefined;
	if (root === undefined) {
		throw new Error("Cannot find mounting point '#app'.");
	}
	render(() => <Root />, root);
}

init();
