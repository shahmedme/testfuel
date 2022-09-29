import { message } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "services/auth";

export default function EmailVerification() {
	const { search } = useLocation();
	const token = new URLSearchParams(search).get("token");
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			if (token) {
				try {
					await verifyEmail(token);
					message.success("Email verified successfully");
					navigate("login");
				} catch (err) {
					console.log("🚀 ~ file: EmailVerification.tsx ~ line 19 ~ err", err);
					// message.error("Something went wrong");
				}
			}
		})();
	}, [token]);

	return <div>EmailVerification</div>;
}
