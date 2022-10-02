/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui";
import { Link } from "components/link";
import { Link as ScrollLink } from "react-scroll";
import Logo from "components/logo";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import MobileDrawer from "./mobileDrawer";
import menuItems from "./header.data";
import logo from "assets/logo.png";

export default function Header({ className }) {
	return (
		<>
			<DrawerProvider>
				<header sx={styles.header} className={className}>
					<Container sx={styles.container}>
						<Logo image={logo} />

						<Flex as="nav" sx={styles.nav}>
							{menuItems.map(({ path, label }, i) => (
								<ScrollLink
									activeClass="active"
									sx={styles.nav.navLink}
									to={path}
									spy={true}
									smooth={true}
									offset={-70}
									duration={500}
									key={i}
								>
									{label}
								</ScrollLink>
							))}
						</Flex>

						<a
							href="https://app.testfuel.io/"
							style={styles.nav.navLink}
							className="hidden md:inline-block login"
						>
							Login
						</a>
						<a href="https://app.testfuel.io/join">
							<Link
								path="https://app.testfuel.io"
								ml={2}
								label="Try for free"
								sx={styles.headerBtn}
								variant="buttons.primary"
							/>
						</a>

						<MobileDrawer />
					</Container>
				</header>
			</DrawerProvider>

			<style jsx>{`
				.login {
					text-decoration: none;
					margin-right: 12px;
					padding: 11px 20px;
					border-radius: 5px;
				}

				.login:hover {
					background: rgba(15, 33, 55, 0.1);
				}
			`}</style>
		</>
	);
}

const styles = {
	headerBtn: {
		backgroundColor: "black",
		fontSize: "16px",
		fontWeight: "bold",
		letterSpacing: "-0.16px",
		borderRadius: "5px",
		color: "#ffffff",
		padding: "5px 20px",
		display: ["none", null, null, null, "inline-block"],
		ml: ["0", null, null, "auto", "0"],
		mr: ["0", null, null, "20px", "0"],
		"&:hover": {
			color: "#fff",
		},
	},
	header: {
		color: "text_white",
		fontWeight: "normal",
		py: "25px",
		width: "100%",
		position: "fixed",
		top: 0,
		left: 0,
		backgroundColor: "transparent",
		transition: "all 0.4s ease",

		"&.sticky": {
			backgroundColor: "background",
			color: "text",
			py: "15px",
			boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
		},
	},
	container: {
		display: "flex",
		alignItems: "center",
		width: [null, null, null, null, null, null, "1390px"],
		"@media screen and (max-width: 960px)": {
			justifyContent: "space-between",
		},
	},
	nav: {
		mx: "auto",
		"@media screen and (max-width: 960px)": {
			display: "none",
		},
		navLink: {
			fontSize: "16px",
			color: "#02073E",
			fontWeight: "400",
			cursor: "pointer",
			lineHeight: "1.2",
			mr: "48px",
			transition: "500ms",
			":lastChild": {
				mr: "0",
			},
			"&:hover, &.active": {
				color: "primary",
			},
		},
	},
};
