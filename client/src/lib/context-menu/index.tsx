import { Dropdown, Menu } from "antd";
import { useState } from "react";
import BtnMore from "./BtnMore";

type Props = {
	children?: any;
	menu?: any;
};

export default function ContextMenu({ children, menu, ...props }: Props & any) {
	const [visible, setVisible] = useState(false);

	return (
		<Dropdown
			visible={visible}
			overlay={menu}
			onVisibleChange={setVisible}
			{...props}
		>
			{children ?? (
				<div>
					<BtnMore active={visible} />
				</div>
			)}
		</Dropdown>
	);
}

ContextMenu.defaultProps = {
	menu: (
		<Menu>
			<Menu.Item key="0">1st menu item</Menu.Item>
			<Menu.Item key="1">2nd menu item</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3">3rd menu item</Menu.Item>
		</Menu>
	),
};
