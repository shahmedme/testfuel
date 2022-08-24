import { Dropdown, Menu } from "antd";

type Props = {
	children?: any;
	menu?: any;
};

export default function ContextMenu({ children, menu, ...props }: Props & any) {
	return (
		<Dropdown overlay={menu} {...props}>
			{children}
		</Dropdown>
	);
}

ContextMenu.defaultProps = {
	children: (
		<button
			className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 focus:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			type="button"
		>
			<svg
				className="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
			</svg>
		</button>
	),
	menu: (
		<Menu>
			<Menu.Item key="0">1st menu item</Menu.Item>
			<Menu.Item key="1">2nd menu item</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3">3rd menu item</Menu.Item>
		</Menu>
	),
};
