import { TrashIcon } from "@heroicons/react/outline";
import { Input } from "antd";

type Props = {
	title: string;
	onUpdate: Function | any;
	onDelete: Function | any;
};

export default function CaseLine({ title, onUpdate, onDelete }: Props) {
	const handleUpdate = (e: any) => {
		onUpdate(e.target.value);
	};

	return (
		<div className="group border-b py-1 flex items-center justify-between">
			<div className="flex items-center w-full">
				<Input
					defaultValue={title}
					className="ml-3 p-0 text-[15px] border-none outline-none focus:ring-0"
					onPressEnter={handleUpdate}
					onBlur={handleUpdate}
				/>
			</div>
			<div className="invisible group-hover:visible">
				<TrashIcon className="w-4 h-4 cursor-pointer" onClick={onDelete} />
			</div>
		</div>
	);
}
