import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { storage } from "services";
import { signin, SignInPayload, signup } from "services/auth";

export default function useAuth() {
	const token = storage.get("token");
	const navigate = useNavigate();

	const login = async (values: SignInPayload) => {
		try {
			const resp = await signin(values);
			storage.set("token", resp.data.token);
			navigate("/");
		} catch (err) {
			message.error("Something went wrong");
		}
	};

	const logout = () => {
		storage.clear();
		navigate("/");
	};

	return { user: token, login, logout, signup };
}
