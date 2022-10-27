import { Divider } from "antd";
import { TextInput } from "flowbite-react";
import { getActiveWorkspace } from "utils/workspace";
import Option from "../_views/Option";
import ManageAccess from "./_views/ManageAccess";

export default function Workspace() {
	const activeWorkspace = getActiveWorkspace();

	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-medium text-lg">Workspace</h3>
					<p className="text-sm">
						Update your workspace information and settings from here
					</p>
				</div>
				<button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3.5 py-1.5 font-medium">
					Save changes
				</button>
			</div>
			<Divider />
			<div className="flex flex-col gap-8">
				<Option
					title="Workspace name"
					extra={
						<div className="w-80">
							<TextInput
								type="text"
								sizing="sm"
								required={true}
								disabled
								defaultValue={activeWorkspace.name}
								style={{ fontWeight: 500 }}
							/>
						</div>
					}
				/>
				<Option title="Logo" extra={<Uploader />} />
				<ManageAccess />
			</div>
		</div>
	);
}

const Uploader = () => {
	return (
		<div className="flex justify-center items-center w-3/5">
			<label
				htmlFor="dropzone-file"
				className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100"
			>
				<div className="flex flex-col justify-center items-center pt-5 pb-6">
					<svg
						aria-hidden="true"
						className="mb-3 w-10 h-10 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						></path>
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span> or drag and
						drop
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF (MAX. 800x400px)
					</p>
				</div>
				<input id="dropzone-file" type="file" className="hidden" />
			</label>
		</div>
	);
};
