import React from "react";
import { Box, Container, Grid } from "theme-ui";
import BlockTitle from "components/block-title";
import ServiceCard from "components/cards/service-card";
import serviceImage1 from "assets/service-1.png";
import serviceImage2 from "assets/service-2.png";
import serviceImage3 from "assets/service-3.png";
import serviceImage4 from "assets/service-4.png";
import serviceImage5 from "assets/service-5.png";
import serviceImage6 from "assets/service-6.png";

const SERVICES_DATA = [
	{
		image: serviceImage1,
		text: "Create test cases, organize them by group, make them more accessible to your team.",
		heading: "Test case management",
		path: "#",
	},
	{
		image: serviceImage2,
		text: "Test each of your releases or branch and view their real-time status.",
		heading: "Release tests",
		path: "#",
	},
	{
		image: serviceImage3,
		text: "Track your issues on built in issue tracking board or 3rd party integration.",
		heading: "Defects tracking",
		path: "#",
	},
	{
		image: serviceImage4,
		text: "Validate your releases against test cases with our real-time test run feature.",
		heading: "Test run",
		path: "#",
	},
	{
		image: serviceImage5,
		text: "Get test result and analytics and share them with your team seamlessly.",
		heading: "Report & analytics",
		path: "#",
	},
	{
		image: serviceImage6,
		text: "Team collaboration is now more easier with report, analytics and tracking.",
		heading: "Collaborate with team",
		path: "#",
	},
];
const Services = () => {
	return (
		<Box as="section" id="services" sx={styles.services}>
			<Container>
				<BlockTitle
					title="What we're offering"
					text="Release high quality product with these features"
				/>
				<Grid sx={styles.grid}>
					{SERVICES_DATA.map(({ image, text, heading, path }, index) => (
						<ServiceCard
							image={image}
							text={text}
							heading={heading}
							path={path}
							key={index}
						/>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Services;

const styles = {
	services: {
		pt: ["80px", null, null, null, "80px", null, "100px"],
	},
	grid: {
		gridGap: "50px 30px",
		gridTemplateColumns: ["1fr", null, null, "1fr 1fr", null, "1fr 1fr 1fr"],
	},
};
