import { TrashIcon } from "@heroicons/react/outline";
import { Icons } from "components";
import Beta from "components/Beta";
import { useState } from "react";
import CaseLine from "./CaseLine";

type Props = {
	name?: string;
	cases: any[];
	onCreate?: Function;
	onUpdate?: Function;
	onDelete?: Function;
};

const Suite = ({ name, cases, onCreate, onUpdate, onDelete }: Props) => {
	const [newCase, setNewCase] = useState<string>("");

	const handleCaseCreate = (e: any) => {
		if (e.key === "Enter" && e.target.value) {
			onCreate?.({ title: e.target.value });
			setNewCase("");
		}
	};

	return (
		<div className="mb-1">
			{name ? (
				<div className="flex items-center bg-gray-100 rounded px-2.5 py-1 group">
					<h3 className="font-semibold text-base">{name}</h3>
					<Beta>
						<div className="ml-7 flex items-center text-gray-500">
							<Icons.Pen className="w-4 h-4 mr-3 cursor-pointer" />
							<TrashIcon className="w-4 h-4 cursor-pointer" />
						</div>
					</Beta>
				</div>
			) : null}

			<div className="pt-2 pb-4">
				{cases?.length
					? cases.map((_case, idx) => (
							<CaseLine
								key={_case.title + idx}
								{..._case}
								onUpdate={(value: string) => onUpdate?.(idx, value)}
								onDelete={() => onDelete?.(idx)}
							/>
					  ))
					: null}
				<div className="flex items-center mt-3">
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
