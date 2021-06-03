import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface MnPortalProps {
  targetDomId: string;
  children: ReactNode;
}

const MnPortal = ({
  children,
  targetDomId,
}: MnPortalProps): ReactElement | null => {
  const [domNode, setDomNode] = useState(document.getElementById(targetDomId));

  useEffect(() => {
    setDomNode(document.getElementById(targetDomId));
  }, [targetDomId]);

  if (!domNode) {
    return null;
  }

  return createPortal(children, domNode);
};

export { MnPortal };
