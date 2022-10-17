import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Card, Divider } from "antd";
import { TextInput } from "flowbite-react";
import { users } from "utils/data";
import Option from "./_views/Option";

export default function Workspace() {
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
								defaultValue={"Shakil's Workspace"}
								style={{ fontWeight: 500 }}
							/>
						</div>
					}
				/>
				<Option title="Logo" extra={<Uploader />} />
				<Option
					title={
						<div className="flex items-center justify-between w-[90%]">
							Manage access
							<span className="inline-flex items-center text-xs hover:underline font-normal cursor-pointer">
								Add member
							</span>
						</div>
					}
					extra={
						<div className="w-3/5">
							<Card className="rounded-lg" bodyStyle={{ padding: "12px 0px" }}>
								<div className="grid grid-cols-1">
									{users.map((user, idx) => (
										<div key={user.email}>
											<div className="flex items-center justify-between px-4 group">
												<div className="flex items-center gap-2.5">
													<img
														src={user.avatar}
														alt="user"
														className="w-7 h-7 rounded-full"
													/>
													<div>
														<h5 className="font-medium">{user.name}</h5>
														<div className="text-xs -m-0.5">{user.email}</div>
													</div>
												</div>
												<button className="text-xs text-gray-500 hidden group-hover:block hover:bg-gray-100 px-2 py-0.5 rounded border border-transparent hover:border-gray-200 hover:text-red-600">
													Remove
												</button>
											</div>
											{idx < users.length - 1 ? (
												<Divider className="my-2.5" />
											) : null}
										</div>
									))}
								</div>
							</Card>
							<div className="flex items-center justify-center mt-3 gap-2">
								<button
									disabled
									className="inline-flex items-center py-1.5 px-3 text-sm font-medium rounded-lg border border-gray-300 bg-gray-100 text-gray-700 opacity-60"
								>
									<ChevronLeftIcon
										className="w-3.5 h-3.5 mr-1"
										style={{ transform: "translateY(-0.6px)" }}
									/>
									Previous
								</button>
								<button className="inline-flex items-center py-1.5 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
									Next
									<ChevronRightIcon
										className="w-3.5 h-3.5 ml-1"
										style={{ transform: "translateY(-0.6px)" }}
									/>
								</button>
							</div>
						</div>
					}
				/>
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
