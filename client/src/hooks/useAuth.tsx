import { useNavigate } from "react-router-dom";
import { storage } from "services";

export default function useAuth() {
	const token = storage.get("token");
	const navigate = useNavigate();

	const login = () => {
		storage.set("token", "dummytoken");
		navigate("/");
	};

	const logout = () => {
		storage.clear();
		window.location.reload();
	};

	return { user: token, login, logout };
}
