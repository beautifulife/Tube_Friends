import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
            <FontAwesomeIcon icon={faUser} />
            <span>My Page</span>
          </li>
        </Link>
        <li className="Profile__list__item" onClick={handleLogOutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
