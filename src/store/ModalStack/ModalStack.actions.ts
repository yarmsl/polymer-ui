import { closeModal, removeModal } from ".";

export const closeModalAction = () => {
  return (dispatch: (arg0: unknown) => void): void => {
    dispatch(closeModal());
    setTimeout(() => dispatch(removeModal()), 100);
  };
};
