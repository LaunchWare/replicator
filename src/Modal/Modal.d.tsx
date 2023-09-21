import { ReactFragment } from "react";

import { ModalSize } from "./ModalSize";

export type ModalProps = {
  isVisible: boolean;
  setVisibility: (setToVisible: boolean) => void;
  children?: ReactFragment;
  portalParent?: Element;
  size: ModalSize;
};
