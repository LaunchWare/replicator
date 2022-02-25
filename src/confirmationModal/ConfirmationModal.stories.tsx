import React from "react";
import { useConfirmationModal } from "./hooks/useConfirmationModal";
import "./css/confirmationModal.css";
import mdx from "./ConfirmationModal.mdx";

export const DefaultConfirmationModal = () => {
  const { showModal, modal } = useConfirmationModal({
    promptText: "You sure?",
    action: () => {
      console.log("confirmed");
    },
  });
  return (
    <>
      <button type="button" onClick={() => showModal()}>
        Do Something
      </button>
      {modal}
    </>
  );
};

DefaultConfirmationModal.storyName = "Default";

export default {
  title: "ConfirmatioModal",
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
