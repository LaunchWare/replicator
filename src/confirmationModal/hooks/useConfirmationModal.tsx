import React from "react";
import { ConfirmationModalOptions } from "../ConfirmationModal.d";
import { ConfirmationModal } from "../ConfirmationModal";
import useModal from "../../modal/hooks/useModal";

export const useConfirmationModal = (
  { promptText = "Are you sure?", action }: ConfirmationModalOptions = {
    action: () => {},
  }
) => {
  const { setModalVisibility, isModalVisible } = useModal({ scrollToTop: false });
  const modalContents = (
    <ConfirmationModal
      action={() => {
        action();
        setModalVisibility(false);
      }}
      promptText={promptText}
      isVisible={isModalVisible}
      hide={() => setModalVisibility(false)}
    />
  );
  const showModal = () => {
    setModalVisibility(true);
  };
  return { modal: modalContents, showModal };
};
