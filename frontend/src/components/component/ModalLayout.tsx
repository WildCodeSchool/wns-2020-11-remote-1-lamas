import React, { ReactElement, useRef } from 'react';
import { useClickAway } from 'react-use';

import './modalLayout.css';

interface ModalLayoutProps {
  children: ReactElement;
  handleModalClose: () => void;
}

const ModalLayout = ({
  children,
  handleModalClose,
}: ModalLayoutProps): ReactElement => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    handleModalClose();
  });

  return (
    <div ref={ref} className="modal">
      {children}
    </div>
  );
};

export default ModalLayout;
