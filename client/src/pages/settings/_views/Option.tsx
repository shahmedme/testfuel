import { Col, Row } from "antd";
import { Switch } from "lib";

type OptionProps = {
	title: any;
	subtitle: any;
	value?: any;
	onChange: any;
};

const Option = ({ title, subtitle, value, onChange }: OptionProps) => {
	return (
		<Row gutter={[48, 48]} align="middle" className="w-2/3">
			<Col span={18}>
				<h5 className="font-medium">{title}</h5>
				<p className="text-sm">{subtitle}</p>
			</Col>
			<Col span={6}>
				<Switch value={value} onChange={onChange} />
			</Col>
		</Row>
	);
};

export default Option;
