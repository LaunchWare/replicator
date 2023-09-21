import { ReactFragment } from "react";

export type ModalProps = {
  isVisible: boolean;
  setVisibility: (setToVisible: boolean) => void;
  children?: ReactFragment;
  portalParent?: Element;
};
