import classNames from "classnames";

type LabelProps = {
	htmlFor?: any;
};

type InputProps = {
	label?: LabelProps;
} & any;

export default function Input({ label, className, ...props }: InputProps) {
	return (
		<div>
			<label
				htmlFor={label?.htmlFor}
				className="block text-sm font-medium text-gray-700"
			>
				First name
			</label>
			<input
				{...props}
				className={classNames(
					"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
					className
				)}
			></input>
		</div>
	);
}

export const classes =
	"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
