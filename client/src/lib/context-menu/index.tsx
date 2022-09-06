import { Dropdown, Menu } from "antd";
import { Icons } from "components";

type Props = {
	children?: any;
	menu?: any;
};

export default function ContextMenu({ children, menu, ...props }: Props & any) {
	return (
		<Dropdown overlay={menu} {...props}>
			{children ?? (
				<div>
					<BtnMore />
				</div>
			)}
		</Dropdown>
	);
}

ContextMenu.defaultProps = {
	menu: (
		<Menu
			items={[
				{ label: "1st menu item", key: "0" },
				{ label: "2nd menu item", key: "1" },
				{ type: "divider" },
				{ label: "3rd menu item", key: "2" },
			]}
		/>
	),
};

function BtnMore() {
	return (
		<button
			className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-50 focus:bg-gray-100"
			type="button"
		>
			<Icons.DotHorizontal />
		</button>
	);
}
