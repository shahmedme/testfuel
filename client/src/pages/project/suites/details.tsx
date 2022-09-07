import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchSuite } from "services/project";
import SuiteNew from "./new";

export default function SuiteDetails() {
	const { suiteId } = useParams();
	const { data } = useQuery(
		["suite", suiteId],
		async () => suiteId && (await fetchSuite(suiteId))
	);

	// @ts-ignore
	return <SuiteNew suite={data?.data} />;
}
