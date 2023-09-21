import { ConfirmationModalProps } from "./ConfirmationModal.d";

export function ConfirmationModal({ action, promptText, setVisibility }: ConfirmationModalProps) {
  return (
    <div className="confirmation-modal">
      <p className="confirmation-modal__text">{promptText}</p>
      <div className="confirmation-modal__actions">
        <button
          type="button"
          className="confirmation-modal__button confirmation-modal__button_no"
          onClick={() => setVisibility && setVisibility(false)}
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
  );
}

export default ConfirmationModal;
