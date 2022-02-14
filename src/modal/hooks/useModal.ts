import { useState } from "react";

export const useModal = ({
  scrollToTop = true,
}: {
  scrollToTop?: boolean;
} = {}): {
  isModalVisible: boolean;
  toggleModalVisibility: () => void;
  setModalVisibility: (isVisible: boolean) => void;
} => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setIsModalVisible((s) => !s);
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const setModalVisibility = (isVisible: boolean) => {
    setIsModalVisible(isVisible);
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  return {
    isModalVisible,
    toggleModalVisibility,
    setModalVisibility,
  };
};

export default useModal;
