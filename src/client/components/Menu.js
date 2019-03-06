import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <ul className="Menu__list">
      <Link to="#">
        <li className="Menu__list__item">About</li>
      </Link>
      <Link to="#">
        <li className="Menu__list__item">Notice</li>
      </Link>
      <Link to="#">
        <li className="Menu__list__item">Terms of service</li>
      </Link>
      <Link to="#">
        <li className="Menu__list__item">Privacy policy</li>
      </Link>
    </ul>
  );
};

export default Menu;
