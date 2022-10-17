import { Divider } from "antd";
import Option from "./_views/Option";

export default function Notifications() {
	return (
		<div>
			<div>
				<h3 className="font-medium text-lg">Notifications</h3>
				<p className="text-sm">
					We may still send you important notificaions about your account
					outside your notification settings
				</p>
			</div>
			<Divider />
			<Option
				title="Tags"
				subtitle="These are notifications for when someone tags you in a comment, post or story"
			/>
			{/* <Divider /> */}
			<div className="h-8" />
			<Option
				title="Comments"
				subtitle="These are notificaions for comments on your posts and replies to your
		comments"
			/>
		</div>
	);
}
