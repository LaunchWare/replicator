import React, { FC } from "react";
import { ReactElement } from "react";
import { ReactFragment, useState } from "react";
import { ModalProps } from "../Modal.d";
import { Modal } from "../Modal";

import { useKeypress } from "../../keypress/hooks/useKeypress";

export const useModal = (
  modalContent: FC<ModalProps>,
  {
    scrollToTop = true,
    portalParent = document.body,
  }: {
    scrollToTop?: boolean;
    portalParent?: Element;
  } = {}
): {
  isVisible: boolean;
  modal: ReactElement;
  toggleVisibility: () => void;
  setVisibility: (isVisible: boolean) => void;
} => {
  const [isVisible, setVisibility] = useState(false);
  const toggleVisibility = () => {
    setVisibility((s) => !s);
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const setModalVisibility = (isVisible: boolean) => {
    setVisibility(isVisible);
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  useKeypress("Escape", () => setVisibility(false));
  const ModalContent: FC<ModalProps> = modalContent;

  const modal = (
    <Modal isVisible={isVisible} setVisibility={setModalVisibility} portalParent={portalParent}>
      <ModalContent isVisible={isVisible} setVisibility={setModalVisibility} />
    </Modal>
  );

  return {
    isVisible,
    modal,
    setVisibility,
    toggleVisibility,
  };
};
