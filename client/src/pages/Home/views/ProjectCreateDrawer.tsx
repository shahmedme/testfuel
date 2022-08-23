import { useMutation } from "@tanstack/react-query";
import { Col, Drawer, Form, Row } from "antd";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
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
	const projectCreateHandler = useMutation(createProject);
	const [form] = Form.useForm();

	const onClose = () => {
		setVisible(false);
		setTimeout(form.resetFields, 500);
	};

	const onCreateProject = async () => {
		await projectCreateHandler.mutateAsync(form.getFieldsValue());
		initProjects();
		onClose();
		setTimeout(form.resetFields, 500);
	};

	return (
		<Drawer
			title="Create project"
			placement="right"
			onClose={onClose}
			visible={visible}
			className="drawer_project-create"
			footer={
				<div className="flex items-center justify-end">
					<Button
						color="gray"
						size="sm"
						onClick={onClose}
						style={{ marginRight: 8 }}
					>
						Cancel
					</Button>
					<Button size="sm" onClick={onCreateProject}>
						Create
					</Button>
				</div>
			}
		>
			<Form form={form} layout="vertical">
				<Row gutter={16}>
					<Col span={24}>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Name" />
						</div>
						<Form.Item
							name="name"
							rules={[{ required: true, message: "Please enter project name" }]}
						>
							<TextInput
								id="name"
								type="text"
								placeholder="Please enter project name"
								required={true}
							/>
						</Form.Item>
						<div className="mb-2 block">
							<Label htmlFor="description" value="Description" />
						</div>
						<Form.Item name="description">
							<Textarea
								id="description"
								placeholder="Please enter description"
								required={true}
								rows={4}
								style={{ minHeight: 114 }}
							/>
						</Form.Item>
					</Col>
				</Row>

				{/* <Row>
					<Col span={24}>
						<Form.Item name="description" label="Description">
							<Input.TextArea rows={4} placeholder="please enter description" />
						</Form.Item>
					</Col>
				</Row> */}
			</Form>
		</Drawer>
	);
}
