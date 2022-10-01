import React, { useEffect } from "react";

export default function Crisp() {
	useEffect(() => {
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_ID;
		(function () {
			var d = document;
			var s = d.createElement("script");
			s.src = "https://client.crisp.chat/l.js";
			s.async = 1;
			d.getElementsByTagName("head")[0].appendChild(s);
		})();
	}, []);

	return <div />;
}
