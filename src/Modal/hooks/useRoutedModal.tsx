import { FC, useEffect } from "react";

import { useMatch, useNavigate } from "react-router";

import { useModal } from "./useModal";

export const useRoutedModal = (modalContents: FC, { path }: { path: string }) => {
  const matches = useMatch(path);
  const navigate = useNavigate();

  const { modal, setVisibility } = useModal(modalContents, {
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
