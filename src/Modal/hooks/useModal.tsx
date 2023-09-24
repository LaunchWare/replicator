import { FC, useState, ReactElement } from "react";

import { useKeypress } from "../../Keypress/hooks/useKeypress";
import { Modal } from "../Modal";
import { ModalProps } from "../Modal.d";
import { ModalSize } from "../ModalSize";

export const useModal = (
  modalContent: FC<ModalProps>,
  {
    scrollToTop = true,
    portalParent,
    onVisibilityChange = () => {},
    size = "large",
  }: {
    scrollToTop?: boolean;
    portalParent?: Element;
    onVisibilityChange?: (isVisible: boolean) => void;
    size?: ModalSize;
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
    onVisibilityChange(isVisible);
  };

  useKeypress("Escape", () => setVisibility(false));
  const ModalContent: FC<ModalProps> = modalContent;

  const modal = (
    <Modal
      isVisible={isVisible}
      size={size}
      setVisibility={setModalVisibility}
      portalParent={portalParent}
    >
      <ModalContent isVisible={isVisible} setVisibility={setModalVisibility} size={size} />
    </Modal>
  );

  return {
    isVisible,
    modal,
    setVisibility,
    toggleVisibility,
  };
};
