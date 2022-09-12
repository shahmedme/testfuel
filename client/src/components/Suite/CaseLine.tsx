import { TrashIcon } from "@heroicons/react/outline";
import { Input } from "antd";
import Icons from "components/Icons";

type Props = {
	title: string;
	onUpdate: Function | any;
	onDelete: Function | any;
};

export default function CaseLine({ title, onUpdate, onDelete }: Props) {
	return (
		<div className="group border-b py-1 flex items-center justify-between">
			<div className="flex items-center">
				<Icons.ArrowUp className="w-3 h-3 mr-2 text-red-500" />{" "}
				<Input
					defaultValue={title}
					className="p-0 text-[15px] border-none outline-none focus:ring-0"
					onPressEnter={onUpdate}
					onBlur={(e) => onUpdate(e.target.value)}
				/>
			</div>
			<div className="invisible group-hover:visible">
				<TrashIcon className="w-4 h-4 cursor-pointer" onClick={onDelete} />
			</div>
		</div>
	);
}
