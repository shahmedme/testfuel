import { Divider } from "antd";
import Beta from "components/Beta";
import { useDispatch, useSelector } from "react-redux";
import { toggleBetaMode } from "services/auth";
import { RootState } from "store";
import { setBetaMode } from "store/auth";
import Option from "./_views/Option";

export default function Developer() {
	const { user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const toggleBeta = async (value: boolean) => {
		dispatch(setBetaMode(value));
		await toggleBetaMode(value);
	};

	return (
		<>
			<div>
				<h3 className="font-medium text-lg">Developer</h3>
				<p className="text-sm">
					This let you configure system behaviors and application settings
				</p>
			</div>
			<Divider />
			<Option
				title="Beta mode"
				subtitle="Turn on beta mode to access more features that to be release soon"
				value={user?.isBeta}
				onChange={toggleBeta}
			/>

			<div className="h-8" />
			<Beta>
				<Option
					title="Comments"
					subtitle="These are notificaions for comments on your posts and replies to your
					comments"
					onChange={() => {}}
				/>
			</Beta>
		</>
	);
}
