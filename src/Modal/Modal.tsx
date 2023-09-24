/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from "react";

import { createPortal } from "react-dom";

import { ModalProps } from "./Modal.d";

export type Modal = FC<ModalProps>;

export function Modal({
  isVisible,
  setVisibility,
  children,
  portalParent,
  size = "large",
}: ModalProps) {
  let actualPortalParent = portalParent;
  if (!portalParent && !!document) {
    actualPortalParent = document.body;
  }
  if (isVisible && actualPortalParent) {
    return createPortal(
      <div className="modal" onClick={() => setVisibility(false)}>
        <div className="modal__overlay" />
        <div className="modal__wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div
            className={`modal__contents${size === "large" ? " modal__contents_large" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
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
      actualPortalParent
    );
  }
  return null;
}
