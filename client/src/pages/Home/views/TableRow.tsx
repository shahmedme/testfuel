import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { Avatar, Menu } from "antd";
import { ContextMenu } from "lib";
import { Link } from "react-router-dom";
import { _avatars } from "..";

type TableRowProps = {
	name: string;
	slug: string;
};

const TableRow = ({ name, slug }: TableRowProps) => {
	const onDelete = () => {};

	return (
		<tr>
			<td className="align-middle py-2.5 text-left">
				<Link to={`/p/${slug}`} className="text-lg font-semibold">
					{name}
				</Link>
				<small className="block">
					52 test cases | 21 suites | 29 active runs
				</small>
			</td>
			<td className="align-middle text-sm py-2.5 text-blue-600">
				42 test runs
			</td>
			<td className="align-middle text-sm py-2.5">
				<Avatar.Group>
					{_avatars.map((avatar, idx) => (
						<Avatar key={idx} src={avatar} />
					))}
				</Avatar.Group>
			</td>
			<td className="align-middle text-base text-right py-2.5">
				<div className="inline-block cursor-pointer">
					<ContextMenu
						trigger={["click"]}
						menu={
							<Menu style={{ width: 150 }}>
								<Menu.Item key="0" icon={<PencilIcon className="w-4 h-4" />}>
									<span className="ml-0.5">Edit</span>
								</Menu.Item>
								<Menu.Item
									key="1"
									icon={<TrashIcon className="w-4 h-4" />}
									onClick={onDelete}
								>
									<span className="ml-0.5">Delete</span>
								</Menu.Item>
							</Menu>
						}
					/>
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
