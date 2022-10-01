// @ts-nocheck
import React, { useEffect } from "react";

export default function Crisp() {
	useEffect(() => {
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = "d611d199-d10a-42ec-a798-a66c82d729a7";
		(function () {
			d = document;
			s = d.createElement("script");
			s.src = "https://client.crisp.chat/l.js";
			s.async = 1;
			d.getElementsByTagName("head")[0].appendChild(s);
		})();
	}, []);

	return <div />;
}
