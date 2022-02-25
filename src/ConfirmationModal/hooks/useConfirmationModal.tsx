import React, { FC } from "react";
import { ConfirmationModalProps } from "../ConfirmationModal.d";
import { ConfirmationModal } from "../ConfirmationModal";
import { useModal } from "../../Modal";
import { ModalProps } from "../../Modal/Modal.d";

export const useConfirmationModal = ({
  promptText = "Are you sure?",
  action,
}: ConfirmationModalProps) => {
  const modalContents: FC<ModalProps> = ({ isVisible, setVisibility }: ModalProps) => (
    <ConfirmationModal
      action={() => {
        action();
        setVisibility(false);
      }}
      promptText={promptText}
      setVisibility={setVisibility}
    />
  );
  const { setVisibility, isVisible, modal } = useModal(modalContents, { scrollToTop: false });
  const showModal = () => {
    setVisibility(true);
  };
  return { modal, showModal };
};
