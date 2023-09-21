import mdx from "./ConfirmationModal.mdx";
import { useConfirmationModal } from "./hooks/useConfirmationModal";

import "./css/confirmationModal.css";

export function DefaultConfirmationModal() {
  const { showModal, modal } = useConfirmationModal({
    promptText: "You sure?",
    action: () => {},
  });
  return (
    <>
      <button type="button" onClick={() => showModal()}>
        Do Something
      </button>
      {modal}
    </>
  );
}

DefaultConfirmationModal.storyName = "Default";

export default {
  title: "ConfirmationModal",
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
