import { ModalSize } from "../Modal/ModalSize";

export type ConfirmationModalProps = {
  action: () => void;
  promptText?: string;
  setVisibility?: (setToVisible: boolean) => void;
  size?: ModalSize;
};
