import { useSelector } from "react-redux";
import { RootState } from "store";

export default function Beta({ children }: any) {
	const { user } = useSelector((state: RootState) => state.auth);

	return user?.isBeta ? children : null;
}
