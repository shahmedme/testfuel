import { useQuery } from "@tanstack/react-query";
import { Col, Form, message, Row } from "antd";
import { Label, Select, TextInput } from "flowbite-react";
import { Button } from "lib";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSuites } from "services/project";
import releaseService from "services/release";

export default function NewRelease() {
	const [form] = Form.useForm();
	const { projectKey } = useParams();
	const { data } = useQuery(
		["suites", projectKey],
		async () => await fetchSuites(projectKey!)
	);
	const activeSuites = useMemo(
		() => data?.data.filter((suite) => !suite.isArchive),
		[data]
	);
	const navigate = useNavigate();

	const handleSuiteCreate = async (values: any) => {
		try {
			const { data: release } = await releaseService.create({
				...values,
				project: projectKey,
			});
			message.success("Release created successfully");
			navigate(`/${projectKey}/releases/${release._id}`);
		} catch (err) {
			console.log("🚀 ~ file: New.tsx:26 ~ handleSuiteCreate ~ err:", err);
			message.error("Something wen't wrong");
		}
	};

	return (
		<div>
			<h1 className="text-xl font-semibold">Create new release</h1>
			<Form form={form} className="mt-8" onFinish={handleSuiteCreate}>
				<div className="mb-2 block">
					<Label htmlFor="title" value="Title" />
				</div>
				<Row>
					<Col span={16}>
						<Form.Item
							name="title"
							rules={[
								{ required: true, message: "Please enter release title" },
							]}
						>
							<TextInput
								id="title"
								type="text"
								placeholder="Please enter release title"
								required={true}
							/>
						</Form.Item>
						<div id="select">
							<div className="mb-2 block">
								<Label htmlFor="suites" value="Suites" />
							</div>
							<Form.Item name="suites">
								<Select
									id="suites"
									required={true}
									multiple
									style={{ height: 200 }}
									onChange={(e) => {
										// @ts-ignore
										const values = [...e.target.selectedOptions].map(
											(opt) => opt.value
										);
										form.setFieldsValue({ suites: values });
									}}
								>
									{activeSuites?.map((suite) => (
										<option key={suite._id} value={suite._id}>
											{suite.name}
										</option>
									))}
								</Select>
							</Form.Item>
						</div>

						<Button type="submit">Create</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
