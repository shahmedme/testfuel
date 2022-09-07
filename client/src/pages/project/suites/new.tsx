import { useMutation } from "@tanstack/react-query";
import { Navbar, Suite } from "components";
import { Spinner } from "flowbite-react";
import { Button } from "lib";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSuite } from "services/project";
import { ICase, ISuite } from "types";

export default function SuiteNew({ suite }: { suite?: ISuite }) {
	console.log("🚀 ~ file: new.tsx ~ line 11 ~ SuiteNew ~ suite", suite);
	const [name, setName] = useState("");
	const [cases, setCases] = useState<ICase[]>([]);
	const suiteHandler = useMutation(createSuite);
	const suiteUpdateHandler = useMutation(createSuite);
	const { projectKey } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (suite) {
			setName(suite.name);
			setCases(suite.cases);
		}
	}, [suite]);

	const createCase = (value: ICase) => {
		setCases([...cases, value]);
	};

	const onCreateSuite = async () => {
		await suiteHandler.mutateAsync({
			name,
			cases,
			project: projectKey ?? "",
		});

		navigate(`/p/${projectKey}/suites`);
	};

	const onUpdateSuite = async () => {
		await suiteUpdateHandler.mutateAsync({
			name,
			cases,
			project: projectKey ?? "",
		});
	};

	return (
		<div>
			<Navbar.Horizontal
				breadcrumb
				extra={
					<SaveOrUpdateBtn
						{...{
							suite,
							suiteHandler,
							onCreateSuite,
							onUpdateSuite,
							suiteUpdateHandler,
						}}
					/>
				}
			/>
			<input
				placeholder="Untitled"
				value={name}
				className="text-2xl font-medium focus:outline-none mt-1 w-full"
				onChange={(e) => setName(e.target.value)}
			/>
			{<Suite cases={cases} onCreate={createCase} />}
		</div>
	);
}

const SaveOrUpdateBtn = ({
	suite,
	suiteHandler,
	onCreateSuite,
	onUpdateSuite,
	suiteUpdateHandler,
}: any) => {
	return !suite ? (
		<Button
			icon={suiteHandler.isLoading ? <Spinner size="sm" light={true} /> : null}
			onClick={onCreateSuite}
		>
			Save changes
		</Button>
	) : (
		<Button
			icon={
				suiteUpdateHandler.isLoading ? <Spinner size="sm" light={true} /> : null
			}
			onClick={onUpdateSuite}
		>
			Update suite
		</Button>
	);
};
