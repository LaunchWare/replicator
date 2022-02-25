import React from "react";
import { useModal } from "./hooks/useModal";
import mdx from "./Modal.mdx";

import "./css/modal.css";

export const DefaultModal = () => {
  const { modal, isVisible, setVisibility } = useModal(() => <p>I'm in a modal</p>);
  return (
    <>
      <button type="button" onClick={() => setVisibility(true)}>
        Do Something
      </button>
      {modal}
    </>
  );
};

DefaultModal.storyName = "Default";

export default {
  title: "Modal",
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
