import { Button, Navbar } from "components";
import React from "react";
import { SuiteAccordion, _suites } from "../Releases/ReleaseSingle";

export default function SuiteNew() {
	return (
		<div>
			<Navbar.Horizontal
				title="Dashboard"
				breadcrumb
				extra={<Button>Save changes</Button>}
			/>
			{<SuiteAccordion cases={_suites[0].cases} />}
		</div>
	);
}
