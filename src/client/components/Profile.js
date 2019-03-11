import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = ({ onLogOutClick, displayName }) => {
  function handleLogOutClick(ev) {
    onLogOutClick();
  }

  return (
    <div className="Profile">
      <ul className="Profile__list">
        <li className="Profile__list__title">{displayName}</li>
        <Link to={`/${displayName}`}>
          <li className="Profile__list__item">
            <FontAwesomeIcon icon="user" />
            <span>My Page</span>
          </li>
        </Link>
        <li className="Profile__list__item" onClick={handleLogOutClick}>
          <FontAwesomeIcon icon="sign-out-alt" />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
