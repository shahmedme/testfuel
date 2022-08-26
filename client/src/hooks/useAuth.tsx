import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "services";
import { signin, SignInPayload, signup } from "services/auth";
import { loadUser } from "store/auth";

export default function useAuth() {
	const token = storage.get("token");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const login = async (values: SignInPayload) => {
		try {
			const resp = await signin(values);
			dispatch(loadUser());
			storage.set("token", resp.data.token);
			navigate("/");
		} catch (err) {
			message.error("Something went wrong");
		}
	};

	const logout = () => {
		storage.clear();
		window.location.href = "/";
	};

	return { user: token, login, logout, signup };
}
