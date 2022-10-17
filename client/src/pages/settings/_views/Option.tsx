import { Col, Row } from "antd";

type OptionProps = {
	title: any;
	subtitle?: any;
	extra?: any;
	elem?: any;
};

const Option = ({ title, subtitle, extra, elem }: OptionProps) => {
	return (
		<div>
			{title && <h5 className="font-medium w-2/3">{title}</h5>}
			<Row gutter={[48, 48]} align="middle" className="w-2/3">
				<Col span={18}>{subtitle && <p className="text-sm">{subtitle}</p>}</Col>
				<Col span={6}>{elem}</Col>
			</Row>
			{extra && <div className="mt-2">{extra}</div>}
		</div>
	);
};

export default Option;
