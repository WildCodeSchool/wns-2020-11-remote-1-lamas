import React from 'react';
import Menu from './Menu';
import './PageLayout.css';

interface PageLayoutProps {
  children: React.ReactNode;
  headband?: string;
}

const PageLayout = (props: PageLayoutProps): JSX.Element => {
  const { children, headband } = props;

  return (
    <div className="page-layout">
      <Menu />
      {headband && (
        <div className="page-layout__headband">
          <p>{headband}</p>
        </div>
      )}
      <div className="page-layout__content">{children}</div>
    </div>
  );
};

export default PageLayout;
