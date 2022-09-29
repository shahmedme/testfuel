import React from "react";
import { Container, Box, Grid } from "theme-ui";
import Masonry from "react-masonry-component";
import BlockTitle from "components/block-title";
import BlogCard from "components/cards/blog-card";

import blogImage1 from "assets/blog-1-1.png";
import blogImage2 from "assets/blog-1-2.png";
import blogImage3 from "assets/blog-1-3.png";
import blogImage4 from "assets/blog-1-4.png";

const BLOG_DATA = [
	{
		image: blogImage1,
		title: "5 Superpowers Every QA Must Have",
		description:
			"Quality Assurance is to bugs what Spiderman is to Doctor Octopus. Actually, bugs are the main enemies of every piece of software and the tester is the person in charge of discovering them inside the code.",
		path: "https://medium.com/southerncode/5-superpowers-every-qa-must-have-32fd73defedd",
		linkLabel: "Learn More",
	},
	{
		image: null,
		title:
			"Quality Assurance: What do you need to know to become an automation test engineer?",
		description: null,
		path: "https://medium.datadriveninvestor.com/quality-assurance-what-do-you-need-to-know-to-become-an-automation-test-engineer-181004866d01",
		linkLabel: null,
	},
	{
		image: blogImage3,
		title: "Why Testing In Production Is Pivotal For Your Release?",
		description: null,
		path: "https://medium.com/@rahulrana09/why-testing-in-production-is-pivotal-for-your-release-69c5f94fdd34",
		linkLabel: null,
	},
	{
		image: blogImage2,
		title: "Common misconceptions about QA testing",
		description:
			"While software testing is an important part of the Software Development Lifecycle (SDLC), and",
		path: "https://medium.com/saratoga-software/common-misconceptions-about-software-testing-c11c73a9d6b5",
		linkLabel: "Learn More",
	},
	{
		image: blogImage4,
		title: "Manual Testing Vs Automated Testing — Top Considerations",
		description: null,
		path: "https://medium.com/@opkey/manual-testing-vs-automated-testing-top-considerations-72b7be1e6f7d",
		linkLabel: null,
	},
];

const masonryOptions = {
	transitionDuration: 0,
};

const Blogs = () => {
	return (
		<Box as="section" id="news" sx={styles.blogs}>
			<Container>
				<BlockTitle
					title="Popular blog post we updated"
					text="Updete contents from our blog"
				/>
				<Box as={Masonry} options={masonryOptions} sx={styles.blogWrapper}>
					{BLOG_DATA.map(
						({ image, title, description, path, linkLabel }, index) => (
							<BlogCard
								key={index}
								image={image}
								title={title}
								description={description}
								path={path}
								linkLabel={linkLabel}
							/>
						)
					)}
				</Box>
			</Container>
		</Box>
	);
};

export default Blogs;

const styles = {
	blogs: {
		pt: ["80px", null, null, null, "80px", null, "100px"],
		pb: ["40px", null, null, null, "140px", null, "100px"],
	},
	blogWrapper: {
		mx: "-15px",
	},
};
