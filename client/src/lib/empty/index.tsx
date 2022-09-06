import React from "react";
import { Empty as AntEmpty } from "antd";

export default function Empty() {
	return (
		<div className="w-[50%] mt-3 mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
			<AntEmpty
				description="No test cases found"
				image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
				imageStyle={styles.placeholderImage}
			/>
		</div>
	);
}

const styles = {
	placeholderImage: {
		height: 60,
		display: "flex",
		justifyContent: "center",
	},
};
