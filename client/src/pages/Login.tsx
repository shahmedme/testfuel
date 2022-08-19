import { Form } from "antd";
import GoogleIcon from "assets/images/google.png";
import { Layout } from "components";
import { useAuth } from "hooks";
import { Link } from "react-router-dom";
import { SignInPayload } from "services/auth";

export default function Login() {
	const { login } = useAuth();

	const handleLogin = async (values: SignInPayload) => {
		await login(values);
	};

	return (
		<Layout.Login title="Log in to your account">
			<Form className="mt-6" onFinish={handleLogin}>
				<div>
					<label className="block text-gray-700">Email Address</label>
					<Form.Item name="email">
						<input
							type="email"
							placeholder="Enter Email Address"
							className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
							required
						/>
					</Form.Item>
				</div>

				<div className="mt-4">
					<label className="block text-gray-700">Password</label>
					<Form.Item name="password">
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
							required
						/>
					</Form.Item>
				</div>

				<div className="text-right mt-2">
					<a
						href="/"
						className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
					>
						Forgot Password?
					</a>
				</div>

				<button
					type="submit"
					className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
				>
					Log In
				</button>
			</Form>

			<hr className="my-6 border-gray-300 w-full" />

			<button
				type="button"
				className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
			>
				<div className="flex items-center justify-center">
					<img src={GoogleIcon} alt="google" className="w-5 h-5" />
					<span className="ml-4">Log in with Google</span>
				</div>
			</button>

			<p className="mt-8">
				Need an account?{" "}
				<Link
					to="/join"
					className="text-blue-500 hover:text-blue-700 font-semibold"
				>
					Create an account
				</Link>
			</p>
		</Layout.Login>
	);
}
