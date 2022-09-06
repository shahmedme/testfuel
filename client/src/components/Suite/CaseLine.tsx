import { TrashIcon } from "@heroicons/react/outline";
import { Input } from "antd";
import Icons from "components/Icons";

export default function CaseLine({ title, onUpdate }: any) {
	return (
		<div className="group border-b py-1 flex items-center justify-between">
			<div className="flex items-center">
				<Icons.ArrowUp className="w-3 h-3 mr-2 text-red-500" />{" "}
				<Input
					defaultValue={title}
					className="p-0 text-[15px] border-none outline-none focus:ring-0"
					onPressEnter={onUpdate}
				/>
			</div>
			<div className="invisible group-hover:visible">
				<TrashIcon className="w-4 h-4 cursor-pointer" />
			</div>
		</div>
	);
}
