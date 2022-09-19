import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { fetchSuite } from "services/project";
import SuiteNew from "./new";

export default function SuiteDetails() {
	const { suiteId } = useParams();
	const { data, isLoading } = useQuery(
		["suite", suiteId],
		async () => suiteId && (await fetchSuite(suiteId))
	);

	return (
		<>
			{!isLoading ? (
				// @ts-ignore
				<SuiteNew suite={data?.data} />
			) : (
				<>
					<Skeleton paragraph={{ rows: 4 }} className="w-2/3" />
				</>
			)}
		</>
	);
}
