export const adjustExtraMenuPosition = (
	isExpanded: boolean,
	workspaceCount: number
) => {
	const wrapperNode = document.querySelector(".v-menu_extra") as HTMLElement;
	const height = 26.66667 * workspaceCount;

	if (wrapperNode) {
		wrapperNode.style.top = isExpanded
			? `calc(${wrapperNode.style.top} - ${height}px)`
			: `calc(${wrapperNode.style.top} + ${height}px)`;
	}
};
