import { useQuery } from "@tanstack/react-query";
import { Card, Empty, Skeleton } from "antd";
import { Icons, Navbar } from "components";
import { Button } from "lib";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSuites } from "services/project";

export default function Suites({ project }: any) {
	const { projectKey } = useParams();
	const { isLoading, data } = useQuery(
		["suites", projectKey],
		async () => await fetchSuites(projectKey!)
	);
	const activeSuites = useMemo(
		() => data?.data.filter((suite) => !suite.isArchive),
		[data]
	);

	return (
		<div>
			<Navbar.Horizontal
				title="Suites"
				extra={
					!isLoading ? (
						activeSuites?.length ? (
							<Button href="archived" state={{ suites: data?.data }}>
								View archived
							</Button>
						) : (
							<Button href="new" state={{ project }}>
								Create suite
							</Button>
						)
					) : null
				}
			/>

			<div className="grid grid-cols-12 gap-6">
				{!isLoading ? (
					activeSuites?.length ? (
						<>
							<Link
								to="new"
								className="col-span-2 border-2 border-dashed border-blue-500 rounded-3xl p-5 h-56 flex items-center justify-center cursor-pointer"
								state={{ project }}
							>
								<Icons.Plus className="border-2 border-blue-500 text-blue-500 rounded-md w-7 h-7" />
							</Link>
							{activeSuites?.map((suite) => (
								<Link
									// @ts-ignore
									to={suite._id}
									key={suite._id}
									className="col-span-2 bg-gray-200 rounded p-5 h-56 flex flex-col justify-end"
									state={{ project, suite }}
								>
									<h3 className="font-semibold text-lg">{suite.name}</h3>
									<small>{suite.cases?.length} test cases</small>
								</Link>
							))}
						</>
					) : (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							className="col-span-12 mt-28"
							description="No suite found"
						/>
					)
				) : (
					<>
						{[1, 2, 3].map((item) => (
							<Card
								key={item}
								className="col-span-2 rounded-xl"
								bodyStyle={styles.sekeletonBody}
							>
								<Skeleton />
							</Card>
						))}
					</>
				)}
			</div>
		</div>
	);
}

const styles = {
	sekeletonBody: {
		display: "flex",
		height: "100%",
		alignItems: "flex-end",
	},
};
