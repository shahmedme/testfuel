import Logo from "assets/images/logo2.png";
import React from "react";

type LoginLayoutProps = {
	title?: string | React.ReactElement;
	children: any;
};

export default function LoginLayout({ children, title }: LoginLayoutProps) {
	return (
		<section className="flex flex-col md:flex-row h-screen items-center">
			<div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
				<img
					src="https://source.unsplash.com/random?tech,night,rocket"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
				<div className="w-full h-100">
					<div className="flex items-center mb-16 justify-center">
						<img src={Logo} alt="logo" className="w-10 h-auto mr-2.5" />
						<h1 className="font-bold text-4xl text-center font-poppins">
							Testfuel
						</h1>
					</div>

					<h1 className="text-xl md:text-2xl font-bold leading-tight">
						{title}
					</h1>

					{children}
				</div>
			</div>
		</section>
	);
}
