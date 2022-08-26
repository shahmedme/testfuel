import React from "react";

type MenuProps = {
	children: React.ReactElement;
};

const Menu = ({ children }: MenuProps) => {
	return <ul className="w-40">{children}</ul>;
};

export default Menu;

type MenuItemProps = {
	icon?: React.ReactElement;
	children: React.ReactChild;
	onClick?: any;
};

Menu.Item = ({ children, onClick }: MenuItemProps) => {
	return (
		<div className="py-1.5 flex items-center cursor-pointer" onClick={onClick}>
			{children}
		</div>
	);
};
