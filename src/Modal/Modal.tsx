import React, { FC } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./Modal.d";

export type Modal = FC<ModalProps>;

export const Modal: Modal = ({
  isVisible,
  setVisibility,
  children,
  portalParent = document.body,
}) => {
  return (
    <>
      {isVisible
        ? createPortal(
            <div className="modal" onClick={() => setVisibility(false)}>
              <div className="modal__overlay" />
              <div className="modal__wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal__contents" onClick={(event) => event.stopPropagation()}>
                  <div className="modal__header">
                    <button
                      type="button"
                      className="modal__close-button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setVisibility(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {children}
                </div>
              </div>
            </div>,
            portalParent
          )
        : null}
    </>
  );
};
