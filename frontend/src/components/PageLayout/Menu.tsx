import React, { useEffect, useState, ReactElement } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Logo from '../../asset/logo-white-lamas_logo.svg';
import './Menu.css';

const Menu = (): ReactElement => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<string>(`/dashboard/${id}`);
  useEffect(() => {
    setActiveTab(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <div className="menu">
      <div
        className="menu__icon-wrapper"
        onClick={() => history.push(`/dashboard/${id}`)}
      >
        <img className="menu__logo" src={Logo} alt="Logo de Lamas" />
      </div>
      <div className="menu__tabs">
        <Link to={`/dashboard/${id}`}>
          <p className="tab__text">Profil</p>
        </Link>
        <div className="tab__id">
          <p>Mon ID : {id}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
