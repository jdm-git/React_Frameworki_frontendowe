import React, { FC } from 'react';
import Photo from '../../models/photo';
import User from '../../models/user';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NoteIcon from '@material-ui/icons/Note';
import AddIcon from '@material-ui/icons/Add';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import "./left-side-menu.scss";
import { Link } from 'react-router-dom';

interface ILeftSideMenuProps {
  user: User;
  photo: Photo;
}

const LeftSideMenuComponent: FC<ILeftSideMenuProps> = ({ user, photo }) => {

  return (
    <div className="smaller-column column" >
      <div className="card">
        <div className="image-container">
          <Link to="/profile">
            <img src={photo.thumbnailUrl} alt="profile" />
            </Link>
        </div>
          <h2>{user.name}</h2>
        <div className="job-title">
          <span>Job title - {user.company.name}</span>
        </div>
        <hr />
        <div className="buttons-container">
          <Link to="/404">
            <div className="container">
              <div className="text">
                <PeopleOutlineIcon />
                <span>Your network</span>
              </div>
              <button><GroupAddIcon /></button>
            </div>
          </Link>
          <Link to="/404">
            <div className="container">
              <div className="text">
                <NoteIcon />
                <span>Your publications</span>
              </div>
              <button><AddIcon /></button>
            </div>
          </Link>
        </div>
      </div>
      <div className="option-containers">
        <div>
          <NoteIcon />
          <Link to="/404">
            <span>Publications</span>
          </Link>
        </div>
        <div>
          <Link to="/404">
            <SystemUpdateAltIcon />
            <span>Ecosystem</span>
          </Link>
        </div>
        <div>
          <Link to="/entities">
            <ApartmentIcon />
            <span>Entities</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LeftSideMenuComponent;