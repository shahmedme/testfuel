import { Dropdown, Menu } from "antd";
import { useState } from "react";
import BtnMore from "./BtnMore";

type Props = {
	children?: any;
	menu?: any;
};

export default function ContextMenu({ children, menu, ...props }: Props & any) {
	// const [visible, setVisible] = useState(false);

	return (
		<Dropdown
			// visible={visible}
			overlay={menu}
			// onVisibleChange={setVisible}
			{...props}
		>
			{children ?? (
				<div>
					<BtnMore
					//  active={visible}
					/>
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
