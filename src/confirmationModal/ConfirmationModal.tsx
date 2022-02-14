import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import { useKeypress } from "../keypress/hooks/useKeypress";
import { useModal } from "../modal/hooks/useModal";

const defaultSize = "small";

export const ConfirmationModal = ({ action, promptText, hide, isVisible, size = defaultSize }) => {
  useKeypress("Escape", hide);
  const { isModalVisible, setModalVisibility } = useModal({
    scrollToTop: false,
  });

  let modalContentsClassName = "confirmation-modal__contents ";
  if (size === "large") {
    modalContentsClassName += "modal__contents_large";
  } else {
    modalContentsClassName += "modal__contents";
  }

  useEffect(() => {
    setModalVisibility(isVisible);
  }, [isVisible]);

  return (
    <>
      {isModalVisible
        ? createPortal(
            <div className="modal" onClick={() => setModalVisibility(false)}>
              <div className="modal__overlay" />
              <div className="modal__wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className={modalContentsClassName} onClick={(e) => e.stopPropagation()}>
                  <p className="confirmation-modal__text">{promptText}</p>
                  <div className="confirmation-modal__actions">
                    <button
                      type="button"
                      className="confirmation-modal__button confirmation-modal__button_no"
                      onClick={hide}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="confirmation-modal__button confirmation-modal__button_yes"
                      onClick={action}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default ConfirmationModal;
