import { FC, useEffect } from "react";

import { useMatch, useNavigate } from "react-router";

import { useModal } from "./useModal";
import { ModalSize } from "../ModalSize";

export const useRoutedModal = (
  modalContents: FC,
  { path, size = "large" }: { path: string; size?: ModalSize }
) => {
  const matches = useMatch(path);
  const navigate = useNavigate();

  const { modal, setVisibility } = useModal(modalContents, {
    size,
    onVisibilityChange: (isVisible) => {
      if (!isVisible) {
        navigate(-1);
      }
    },
  });

  useEffect(() => {
    if (matches) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [matches, setVisibility]);

  return { modal };
};
