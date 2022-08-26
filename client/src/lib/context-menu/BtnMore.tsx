import classNames from "classnames";
import { Icons } from "components";

export default function BtnMore({ active }: any) {
	return (
		<button
			className={classNames(
				"inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100",
				{
					"ring-2 outline-none ring-gray-50 bg-gray-100": active,
				}
			)}
			type="button"
		>
			<Icons.DotHorizontal />
		</button>
	);
}
