import { InformationCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { Icons } from "components";
import { useState } from "react";
import CaseLine from "./CaseLine";

type PropsType = {
	title?: string;
	cases: any[];
	onCreate?: Function;
};

const Suite = ({ title, cases, onCreate }: PropsType) => {
	const [newCase, setNewCase] = useState<string>("");

	const handleCaseCreate = (e: any) => {
		if (e.key === "Enter") {
			onCreate?.({ title: e.target.value });
			setNewCase("");
		}
	};

	return (
		<div className="mb-1">
			{title ? (
				<div className="flex items-center bg-gray-100 rounded px-2.5 py-1 group">
					<h3 className="font-semibold text-base">{title}</h3>
					<div className="ml-7 flex items-center text-gray-500">
						<Icons.Pen className="w-4 h-4 mr-3 cursor-pointer" />
						<TrashIcon className="w-4 h-4 cursor-pointer" />
					</div>
				</div>
			) : null}

			<div className="pt-2 pb-4">
				{cases.length ? (
					cases.map((_case, idx) => (
						<CaseLine
							key={idx}
							{..._case}
							onUpdate={(e: any) => console.log(e.target.value)}
						/>
					))
				) : (
					<div className="flex p-4 mt-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg">
						<InformationCircleIcon className="w-5 h-5 mr-2.5" />
						<div className="transform translate-y-0.5">
							<span className="font-medium">No test case found!</span> Create a
							test case for this suite.
						</div>
					</div>
				)}
				<div className="flex items-center mt-2.5">
					<Icons.Plus className="text-gray-300 w-5 h-5 -mt-0.5 mr-0.5" />
					<input
						type="text"
						placeholder="Create quick test"
						value={newCase}
						className="py-0.5 focus:outline-none border-0 focus:ring-0 w-full"
						onKeyDown={handleCaseCreate}
						onChange={(e) => setNewCase(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Suite;
