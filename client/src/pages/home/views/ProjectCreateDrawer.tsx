import { XIcon } from "@heroicons/react/outline";
import { useMutation } from "@tanstack/react-query";
import { Col, Drawer, Form, Row } from "antd";
import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { createProject, updateProject } from "services/project";
import { IProject } from "types";
import { getActiveWorkspace } from "utils/workspace";

type Props = {
	visible: boolean;
	setVisible: any;
	updateData: IProject;
	refetch: any;
};

export default function ProjectCreateDrawer({
	visible,
	setVisible,
	updateData,
	refetch,
}: Props) {
	const [okLoading, setOkLoading] = useState(false);
	const projectCreateHandler = useMutation(createProject);
	const [form] = Form.useForm();

	useEffect(() => {
		if (updateData) {
			form.setFieldsValue(updateData);
		}
	}, [updateData]);

	const onClose = () => {
		setVisible(false);
		setTimeout(form.resetFields, 500);
	};

	const onCreateProject = async () => {
		setOkLoading(true);

		if (updateData) {
			await updateProject(updateData.id, form.getFieldsValue());
		} else {
			await projectCreateHandler.mutateAsync({
				...form.getFieldsValue(),
				workspaceId: getActiveWorkspace()?.id,
			});
		}

		refetch();
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
			closeIcon={<XIcon className="w-5 h-5" />}
			// closeIcon={<Icons.Close />}
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
						{updateData ? "Update" : "Create"}
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
