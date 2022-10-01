import Document, { Html, Head, Main, NextScript } from "next/document";
import favicon from "assets/favicon.png";
import Crisp from "components/crisp";

class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en-US">
				<Head>
					<link rel="shortcut icon" href={favicon} />
					<script src="https://cdn.tailwindcss.com"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
					<Crisp />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
