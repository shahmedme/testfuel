/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Link } from "components/link";

export default function Logo({ image }) {
	return (
		<Link
			path="/"
			sx={{
				variant: "links.logo",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Image
				src={image}
				alt="Testfuel - Your software QA made simple"
				style={{ height: 32 }}
			/>
		</Link>
	);
}
