import { useMutation } from "@tanstack/react-query";
import { Navbar, Suite } from "components";
import { Spinner } from "flowbite-react";
import { Button } from "lib";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSuite } from "services/project";
import { ICase } from "types";

export default function SuiteNew() {
	const [title, setTitle] = useState("");
	const [cases, setCases] = useState<ICase[]>([]);
	const suiteHandler = useMutation(createSuite);
	const { projectKey } = useParams();
	const navigate = useNavigate();

	const createCase = (value: ICase) => {
		setCases([...cases, value]);
	};

	const onCreateSuite = async () => {
		await suiteHandler.mutateAsync({
			name: title,
			cases,
			project: projectKey ?? "",
		});

		navigate(`/p/${projectKey}/suites`);
	};

	return (
		<div>
			<Navbar.Horizontal
				breadcrumb
				extra={
					<Button
						icon={
							suiteHandler.isLoading ? <Spinner size="sm" light={true} /> : null
						}
						onClick={onCreateSuite}
					>
						Save changes
					</Button>
				}
			/>
			<input
				placeholder="Untitled"
				value={title}
				className="h-6 text-2xl font-medium focus:outline-none mt-1"
				onChange={(e) => setTitle(e.target.value)}
			/>
			{<Suite cases={cases} onCreate={createCase} />}
		</div>
	);
}
