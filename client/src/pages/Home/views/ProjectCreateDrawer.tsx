import { Button, Col, Drawer, Form, Input, Row } from "antd";
import React from "react";
import { createProject } from "services/project";

type Props = {
	visible: boolean;
	setVisible: any;
	initProjects: any;
};

export default function ProjectCreateDrawer({
	visible,
	setVisible,
	initProjects,
}: Props) {
	const [form] = Form.useForm();

	const onClose = () => {
		setVisible(false);
	};

	const onCreateProject = async () => {
		await createProject(form.getFieldsValue());
		initProjects();
		onClose();
		form.resetFields();
	};

	return (
		<Drawer
			title="Create project"
			placement="right"
			onClose={onClose}
			visible={visible}
			footer={
				<div
					style={{
						textAlign: "right",
					}}
				>
					<Button onClick={onClose} style={{ marginRight: 8 }}>
						Cancel
					</Button>
					<Button
						onClick={onCreateProject}
						type="primary"
						style={{ backgroundColor: "#40a9ff" }}
					>
						Create
					</Button>
				</div>
			}
		>
			<Form form={form} layout="vertical">
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name="name"
							label="Name"
							rules={[{ required: true, message: "Please enter project name" }]}
						>
							<Input placeholder="Please enter project name" />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={24}>
						<Form.Item name="description" label="Description">
							<Input.TextArea rows={4} placeholder="please enter description" />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
}
