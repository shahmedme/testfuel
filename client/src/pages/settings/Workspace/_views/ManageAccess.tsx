import {
	ChevronLeftIcon,
	ChevronRightIcon,
	PaperAirplaneIcon,
	PlusIcon,
} from "@heroicons/react/outline";
import { Card, Divider, message } from "antd";
import { Button, TextInput } from "flowbite-react";
import { Modal } from "lib";
import _ from "lodash";
import Option from "pages/settings/_views/Option";
import { useState } from "react";
import { inviteToWorkspace } from "services/workspace";
import { users } from "utils/data";
import { validateEmail } from "utils/misc";
import { getActiveWorkspace } from "utils/workspace";

export default function ManageAccess() {
	const [inviteModalVisible, setInviteModalVisible] = useState(false);
	const [invitees, setInvitees] = useState<string[]>([""]);
	const activeWorkspace = getActiveWorkspace();

	const onChangeInvite = (idx: number) => (e: any) => {
		const _invitedUsers = _.cloneDeep(invitees);
		_invitedUsers[idx] = e.target.value;
		setInvitees(_invitedUsers);
	};

	const handleInvite = async () => {
		const _invitees = invitees.filter((invitee) => invitee);
		const hasError = _invitees.find((invitee) => !validateEmail(invitee));

		if (!hasError) {
			try {
				await inviteToWorkspace(activeWorkspace?._id, _invitees);
				message.success("Invited to workspace successfully");
				setInviteModalVisible(false);
				setInvitees([""]);
			} catch (err) {
				message.error("Something wen't wrong");
			}
		} else {
			message.error("Please enter valid email");
		}
	};

	return (
		<>
			<Option
				title={
					<div className="flex items-center justify-between w-[90%]">
						Manage access
						<span
							className="inline-flex items-center text-xs hover:underline font-normal cursor-pointer"
							onClick={() => setInviteModalVisible(true)}
						>
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

			<Modal
				visible={inviteModalVisible}
				closable={false}
				centered={false}
				onCancel={() => setInviteModalVisible(false)}
			>
				<h4 className="text-center font-semibold text-lg">
					Invite new members
				</h4>
				<p className="text-center mb-5">
					Send invitation links to team members
				</p>

				<div className="flex flex-col gap-2">
					{invitees.map((user: any, idx: number) => (
						<TextInput
							key={idx}
							type="email"
							sizing="sm"
							required={true}
							placeholder="Invite by email"
							style={{ fontWeight: 500 }}
							onChange={onChangeInvite(idx)}
							// onKeyDown={(e) =>
							// 	e.key === "Enter" && setInvitees([...invitees, 1])
							// }
						/>
					))}
				</div>

				<div className="mt-3 flex items-center justify-between">
					<button
						className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 rounded-md border border-transparent hover:border-gray-200"
						onClick={() => setInvitees([...invitees, ""])}
					>
						Add new member <PlusIcon className="w-3.5 h-3.5" />
					</button>
					<Button
						size="sm"
						style={{ display: "flex", alignItems: "center" }}
						onClick={handleInvite}
					>
						<span className="translate-y-0.5">Invite</span>
						<PaperAirplaneIcon className="w-4 h-4 rotate-45 ml-2 -translate-y-0.5" />
					</Button>
				</div>
			</Modal>
		</>
	);
}
