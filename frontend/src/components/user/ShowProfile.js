import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import * as COLORS from '../../colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import SocialMedia from './social_media';
import ProjectCarousel from './project_carousel';

function ShowProfile({ currentUser, user, history }) {
  alert('get outta here');

  const tempUser = {
    id: 12345678,
    handle: 'dev',
    name: 'frodo',
    title: 'Legend',
    createdAt: '2020-12-27T22:40:35.596Z',
    bio:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth. I like turtles.',
    email: 'dev@dev.com',
    experience: [
      { start: 'date', end: 'date', company: 'Google', position: 'Wizard' },
    ],
    imageUrl:
      'https://m.economictimes.com/thumb/msid-75515225,width-1200,height-900,resizemode-4,imgsize-119370/untitled-3.jpg',
    projects: ['5fea318d886a134ada343430'],
    skills: [
      { skill: 'javascript', level: 2 },
      { skill: 'ruby', level: 10 },
      { skill: 'turtles', level: 7 },
    ],
    socials: [
      { facebook: 'http://www.facebook.com' },
      { twitter: 'http://www.twitter.com' },
      { github: 'http://www.github.com' },
    ],
  };

  const skills = tempUser.skills.map((skill) => (
    <div className="skill">
      <span className="skill-name">{skill.skill}</span>
      <div className="skill-level-container">
        <div className="skill-level" style={{ width: skill.level * 10 }}></div>
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <div className="user-header">
        <div className="icon-overlay">
          <div className="back-icon pointer" onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </div>
          <div
            className="edit-icon pointer"
            onClick={() => history.push('/edit')}
          >
            {currentUser && currentUser.id == tempUser.id ? <EditIcon /> : ''}
          </div>
        </div>
        <div className="user-image-container">
          <div className="user-image">
            <img src={tempUser.imageUrl} />
          </div>
        </div>
        <div className="user-info">
          <h1 className="user-name">{tempUser.name}</h1>
          <h2 className="user-title">{tempUser.title}</h2>
          <p className="user-bio">{tempUser.bio}</p>
          <SocialMedia socials={tempUser.socials} />
        </div>
      </div>
      <ProjectCarousel />
      <div className="user-details">
        <div className="extra-info">
          <h3 className="info-title">Info</h3>
          <span>Location, Somewhere</span>
          <span>X years experience</span>
          <span>Member since {tempUser.createdAt.slice(0, 4)}</span>
        </div>
        <div className="work-info">
          <h3 className="info-title">Work</h3>
          <span>Job1</span>
          <span>Job2</span>
          <span>Job3</span>
          <span>Job4</span>
        </div>
        <div className="skills">
          <h3 className="info-title">Skills</h3>
          {skills}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapSTP = (store, ownProps) => {
  return {
    currentUser: store.session.user,
    user: store.entities.users[ownProps.match.params.id],
    projects: store.entities.projects,
  };
};

export default connect(mapSTP)(ShowProfile);
