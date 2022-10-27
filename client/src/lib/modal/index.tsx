import { Modal as AntModal, ModalProps } from "antd";
import classNames from "classnames";

export default function Modal({ children, className, ...props }: ModalProps) {
	return (
		<AntModal
			footer={null}
			centered
			className={classNames(
				"rounded-lg overflow-hidden custom-modal",
				className
			)}
			{...props}
		>
			{children}
		</AntModal>
	);
}
