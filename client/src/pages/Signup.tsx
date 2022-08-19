import { Form, message } from "antd";
import { Layout } from "components";
import { useAuth } from "hooks";
import { Link, useNavigate } from "react-router-dom";
import { SignUpPayload } from "services/auth";

export default function Signup() {
	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleSignUp = async (values: SignUpPayload) => {
		try {
			await signup(values);
			navigate("/login");
		} catch (err) {
			message.error("Something went wrong");
			return;
		}
	};

	return (
		<Layout.Login title="Create an account">
			<Form className="mt-6" onFinish={handleSignUp}>
				<div className="grid grid-cols-2 gap-3.5">
					<div className="col-span-1">
						<div>
							<label className="block text-gray-700">First name</label>
							<Form.Item name="firstName">
								<input
									type="text"
									placeholder="First name"
									className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
									required
								/>
							</Form.Item>
						</div>
					</div>

					<div className="col-span-1">
						<div>
							<label className="block text-gray-700">Last name</label>
							<Form.Item name="lastName">
								<input
									type="text"
									placeholder="Last name"
									className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
									required
								/>
							</Form.Item>
						</div>
					</div>
				</div>

				<div>
					<label className="block text-gray-700">Email address</label>
					<Form.Item name="email">
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
							required
						/>
					</Form.Item>
				</div>

				<div>
					<label className="block text-gray-700">Password</label>
					<Form.Item name="password">
						<input
							type="password"
							placeholder="Enter password"
							className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
							required
						/>
					</Form.Item>
				</div>

				<button
					type="submit"
					className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
				>
					Sign Up
				</button>
			</Form>

			<p className="mt-8">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-blue-500 hover:text-blue-700 font-semibold"
				>
					Sign in
				</Link>
			</p>
		</Layout.Login>
	);
}
