import { useMutation } from "@tanstack/react-query";
import { Col, Drawer, Form, Row } from "antd";
import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createProject } from "services/project";
import { RootState } from "store";

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
	const [okLoading, setOkLoading] = useState(false);
	const projectCreateHandler = useMutation(createProject);
	const [form] = Form.useForm();
	const { workspaces } = useSelector((state: RootState) => state.auth);

	const onClose = () => {
		setVisible(false);
		setTimeout(form.resetFields, 500);
	};

	const onCreateProject = async () => {
		setOkLoading(true);
		await projectCreateHandler.mutateAsync({
			...form.getFieldsValue(),
			workspace: workspaces?.[0]._id,
		});
		initProjects();
		onClose();
		setTimeout(() => {
			form.resetFields();
			setOkLoading(false);
		}, 500);
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
						{okLoading ? (
							<span className="mr-1.5">
								<Spinner size="sm" light={true} />
							</span>
						) : null}
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
