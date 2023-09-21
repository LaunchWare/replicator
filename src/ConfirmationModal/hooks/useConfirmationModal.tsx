import { FC } from "react";

import { useModal } from "../../Modal";
import { ModalProps } from "../../Modal/Modal.d";
import { ConfirmationModal } from "../ConfirmationModal";
import { ConfirmationModalProps } from "../ConfirmationModal.d";

export const useConfirmationModal = ({
  promptText = "Are you sure?",
  action,
  size = "large",
}: ConfirmationModalProps) => {
  const modalContents: FC<ModalProps> = ({ setVisibility }: ModalProps) => (
    <ConfirmationModal
      action={() => {
        action();
        setVisibility(false);
      }}
      promptText={promptText}
      setVisibility={setVisibility}
    />
  );
  const { setVisibility, modal } = useModal(modalContents, { scrollToTop: false, size });
  const showModal = () => {
    setVisibility(true);
  };
  return { modal, showModal };
};
